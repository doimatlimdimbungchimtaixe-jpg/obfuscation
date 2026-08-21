import { obfuscateLua } from '@/lib/obfuscator';

export async function POST(request: Request) {
  try {
    const { code, options } = await request.json();
    
    if (!code || typeof code !== 'string') {
      return Response.json({ error: 'Invalid code provided' }, { status: 400 });
    }

    if (code.length > 500000) {
      return Response.json({ error: 'Code too large (max 500KB)' }, { status: 400 });
    }

    const obfuscated = obfuscateLua(code, options || {
      stringEncryption: true,
      controlFlow: true,
      variableRenaming: true,
      deadCode: true,
      antiDebug: true,
      selfModifying: true,
      layers: 3
    });

    return Response.json({ 
      obfuscated,
      originalSize: code.length,
      obfuscatedSize: obfuscated.length,
      ratio: ((obfuscated.length / code.length) * 100).toFixed(1)
    });
  } catch (error) {
    console.error('Obfuscation error:', error);
    return Response.json({ error: 'Obfuscation failed' }, { status: 500 });
  }
}