const {
    CPP,
    C,
    PYTHON,
    JAVA,
    NODEJS,
    RUBY,
    PROMPTV1,
    PROMPTV2,
    RUST,
    SWIFT,
    GO,
} = require('../enums/supportedLanguages');

const ONE_MB = 1024; // ulimit uses Kilobyte as base unit
const ALLOWED_RAM = process.env.ALLOWED_RAM || 512;

const LANGUAGES_CONFIG = {
    [C]: {
        compile: 'gcc -o a.out solution.c',
        run: './a.out',
        timeout: 15,
        filename: 'solution.c',
        memory: ALLOWED_RAM * ONE_MB,
    },
    [CPP]: {
        compile: 'g++ -o a.out -pthread -O0 solution.cpp',
        run: './a.out',
        timeout: 15,
        filename: 'solution.cpp',
        memory: ALLOWED_RAM * ONE_MB,
    },
    [PYTHON]: {
        compile: 'python -m compileall -q solution.py',
        run: 'python solution.py',
        timeout: 15,
        filename: 'solution.py',
        memory: ALLOWED_RAM * ONE_MB,
    },
    [JAVA]: {
        compile: 'javac Solution.java',
        run: 'java Solution',
        timeout: 15,
        filename: 'Solution.java',
        memory: ALLOWED_RAM * ONE_MB,
    },
    [NODEJS]: {
        compile: 'node --check solution.js',
        run: 'node solution.js',
        timeout: 15,
        filename: 'solution.js',
        memory: 786432, // 768 MB
    },
    [RUBY]: {
        compile: 'ruby -c solution.rb',
        run: 'ruby solution.rb',
        timeout: 15,
        filename: 'solution.rb',
        memory: ALLOWED_RAM * ONE_MB,
    },
    [RUST]: {
        compile: 'rustc -o solution solution.rs',
        run: './solution',
        timeout: 15,
        filename: 'solution.rs',
        memory: ALLOWED_RAM * ONE_MB,
    },
    [SWIFT]: {
        compile: 'swiftc -o solution solution.swift',
        run: './solution',
        timeout: 15,
        filename: 'solution.swift',
        memory: ALLOWED_RAM * ONE_MB,
    },
    [GO]: {
        compile: 'go build -o solution solution.go',
        run: './solution',
        timeout: 15,
        filename: 'solution.go',
        memory: ALLOWED_RAM * ONE_MB,
    },
    [PROMPTV1]: {
        model: 'gpt-4-1106-preview',
    },
    [PROMPTV2]: {
        model: 'gpt-3.5-turbo-1106',
    },
};

module.exports = { LANGUAGES_CONFIG };
