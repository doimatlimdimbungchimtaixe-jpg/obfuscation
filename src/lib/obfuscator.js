const crypto = require('crypto');

class LuaObfuscator {
  constructor(options = {}) {
    this.options = {
      stringEncryption: options.stringEncryption !== false,
      controlFlow: options.controlFlow !== false,
      variableRenaming: options.variableRenaming !== false,
      deadCode: options.deadCode !== false,
      antiDebug: options.antiDebug !== false,
      selfModifying: options.selfModifying !== false,
      layers: options.layers || 3,
      ...options
    };
    this.variableCounter = 0;
    this.stringPool = new Map();
    this.encryptedStrings = new Map();
    this.functionCounter = 0;
  }

  generateVarName() {
    const chars = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ_$';
    let name = '_';
    for (let i = 0; i < 8; i++) {
      name += chars[Math.floor(Math.random() * chars.length)];
    }
    return name + this.variableCounter++;
  }

  generateFuncName() {
    return 'f_' + this.generateVarName().slice(1);
  }

  encryptString(str) {
    const key = crypto.randomBytes(32);
    const iv = crypto.randomBytes(16);
    const cipher = crypto.createCipheriv('aes-256-cbc', key, iv);
    let encrypted = cipher.update(str, 'utf8', 'hex');
    encrypted += cipher.final('hex');
    const tag = crypto.randomBytes(16).toString('hex');
    return { encrypted, key: key.toString('hex'), iv: iv.toString('hex'), tag };
  }

  decryptString(encrypted, key, iv) {
    const decipher = crypto.createDecipheriv('aes-256-cbc', Buffer.from(key, 'hex'), Buffer.from(iv, 'hex'));
    let decrypted = decipher.update(encrypted, 'hex', 'utf8');
    decrypted += decipher.final('utf8');
    return decrypted;
  }

  obfuscateStrings(code) {
    const strings = [];
    let modifiedCode = code.replace(/(["'`])((?:\\.|(?!\1).)*)\1/g, (match, quote, content) => {
      if (content.length < 2) return match;
      const encrypted = this.encryptString(content);
      const varName = this.generateVarName();
      strings.push({ varName, ...encrypted, quote });
      return varName;
    });

    const decrypter = this.generateDecrypter(strings);
    return decrypter + '\n' + modifiedCode;
  }

  generateDecrypter(strings) {
    if (strings.length === 0) return '';
    
    const funcName = this.generateFuncName();
    const keyVar = this.generateVarName();
    const ivVar = this.generateVarName();
    const dataVar = this.generateVarName();
    
    let decrypter = `local ${funcName}=function(${dataVar},${keyVar},${ivVar})local cipher=require('crypto').createDecipheriv('aes-256-cbc',${keyVar},${ivVar})local r=cipher.update(${dataVar},'hex','utf8')r=r+cipher.final('utf8')return r end;`;
    
    strings.forEach(s => {
      decrypter += `local ${s.varName}=${funcName}('${s.encrypted}','${s.key}','${s.iv}');`;
    });
    
    return decrypter;
  }

  obfuscateVariables(code) {
    const variables = new Set();
    const pattern = /\b(local\s+)?([a-zA-Z_][a-zA-Z0-9_]*)\s*=/g;
    let match;
    while ((match = pattern.exec(code)) !== null) {
      if (match[2] && !match[2].startsWith('_') && match[2].length > 1) {
        variables.add(match[2]);
      }
    }

    const varMap = new Map();
    variables.forEach(v => varMap.set(v, this.generateVarName()));

    let result = code;
    varMap.forEach((newName, oldName) => {
      const regex = new RegExp(`\\b${oldName}\\b`, 'g');
      result = result.replace(regex, newName);
    });

    return result;
  }

  injectDeadCode(code) {
    const deadPatterns = [
      `if false then ${this.generateVarName()} = ${Math.random()} end;`,
      `while false do ${this.generateVarName()} = ${this.generateVarName()} end;`,
      `local ${this.generateVarName()} = function() return ${Math.random()} end;`,
      `pcall(function() ${this.generateVarName()} = ${this.generateVarName()} end);`,
      `xpcall(function() end, function() end);`,
      `coroutine.wrap(function() ${this.generateVarName()} = ${Math.random()} end)();`,
    ];

    const lines = code.split('\n');
    const result = [];
    lines.forEach((line, i) => {
      result.push(line);
      if (Math.random() < 0.3 && line.trim() && !line.trim().startsWith('--')) {
        result.push(deadPatterns[Math.floor(Math.random() * deadPatterns.length)]);
      }
    });
    return result.join('\n');
  }

  obfuscateControlFlow(code) {
    const funcName = this.generateFuncName();
    const stateVar = this.generateVarName();
    const jumpTable = this.generateVarName();
    
    let wrapper = `local ${funcName} = function()\n`;
    wrapper += `  local ${stateVar} = 1;\n`;
    wrapper += `  local ${jumpTable} = {};\n`;
    
    const blocks = this.splitIntoBlocks(code);
    blocks.forEach((block, i) => {
      const label = this.generateVarName();
      wrapper += `  ${jumpTable}[${i + 1}] = function() ${block} ${stateVar} = ${i + 2}; end;\n`;
    });
    
    wrapper += `  while ${stateVar} <= ${blocks.length} do ${jumpTable}[${stateVar}]() end\n`;
    wrapper += `end;\n${funcName}();`;
    
    return wrapper;
  }

  splitIntoBlocks(code) {
    const statements = code.split(';').filter(s => s.trim());
    const blocks = [];
    let currentBlock = '';
    
    statements.forEach(stmt => {
      currentBlock += stmt + ';';
      if (Math.random() < 0.4 || currentBlock.length > 200) {
        blocks.push(currentBlock);
        currentBlock = '';
      }
    });
    
    if (currentBlock) blocks.push(currentBlock);
    return blocks.length > 0 ? blocks : [code];
  }

  addAntiDebug(code) {
    const antiDebug = `
local ${this.generateVarName()} = function()
  if debug and debug.getinfo then
    local info = debug.getinfo(1, 'S')
    if info and info.source and info.source:match('stdin') then os.exit(1) end
  end
  local t = os.clock()
  local ${this.generateVarName()} = 0
  for i = 1, 10000 do ${this.generateVarName()} = ${this.generateVarName()} + i end
  if os.clock() - t > 0.1 then os.exit(1) end
end;
${this.generateVarName()}();
`;
    return antiDebug + code;
  }

  addSelfModifying(code) {
    const smFunc = this.generateFuncName();
    const codeVar = this.generateVarName();
    
    const encoded = Buffer.from(code).toString('base64');
    const chunks = [];
    for (let i = 0; i < encoded.length; i += 500) {
      chunks.push(encoded.slice(i, i + 500));
    }
    
    let smCode = `local ${codeVar} = '';\n`;
    chunks.forEach((chunk, i) => {
      smCode += `local ${this.generateVarName()} = '${chunk}'; ${codeVar} = ${codeVar} .. ${this.generateVarName()};\n`;
    });
    
    smCode += `local ${smFunc} = loadstring(require('crypto').createDecipheriv('aes-256-cbc', 'deadbeefdeadbeefdeadbeefdeadbeef', '1234567890123456')(${codeVar})); ${smFunc}();`;
    
    return smCode;
  }

  addObfuscationLayers(code) {
    let result = code;
    for (let i = 0; i < this.options.layers; i++) {
      result = this.addPolymorphicLayer(result);
    }
    return result;
  }

  addPolymorphicLayer(code) {
    const wrapper = this.generateFuncName();
    const encoded = Buffer.from(code).toString('base64');
    const key = crypto.randomBytes(16).toString('hex');
    const iv = crypto.randomBytes(16).toString('hex');
    
    const encrypted = this.encryptString(code);
    
    return `local ${wrapper} = (function() local c = require('crypto'); local d = c.createDecipheriv('aes-256-cbc', '${encrypted.key}', '${encrypted.iv}'); local r = d.update('${encrypted.encrypted}', 'hex', 'utf8'); return loadstring(r .. d.final('utf8')) end)(); ${wrapper}();`;
  }

  obfuscate(code) {
    let result = code;
    
    if (this.options.stringEncryption) {
      result = this.obfuscateStrings(result);
    }
    
    if (this.options.variableRenaming) {
      result = this.obfuscateVariables(result);
    }
    
    if (this.options.deadCode) {
      result = this.injectDeadCode(result);
    }
    
    if (this.options.controlFlow) {
      result = this.obfuscateControlFlow(result);
    }
    
    if (this.options.antiDebug) {
      result = this.addAntiDebug(result);
    }
    
    if (this.options.selfModifying) {
      result = this.addSelfModifying(result);
    }
    
    result = this.addObfuscationLayers(result);
    
    return this.minify(result);
  }

  minify(code) {
    return code
      .replace(/--\[\[[\s\S]*?\]\]/g, '')
      .replace(/--.*$/gm, '')
      .replace(/\s+/g, ' ')
      .replace(/\s*([=+\-*/%,{}()\[\];<>])\s*/g, '$1')
      .trim();
  }
}

function obfuscateLua(code, options = {}) {
  const obfuscator = new LuaObfuscator(options);
  return obfuscator.obfuscate(code);
}

module.exports = { obfuscateLua, LuaObfuscator };