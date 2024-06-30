const {
    CPP,
    C,
    PYTHON,
    JAVA,
    NODEJS,
    RUBY,
    PROMPTV1,
    PROMPTV2,
    PHP,
    Perl,
    Bash
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
        timeout: 30000,
        filename: 'solution.cpp',
        memory: ALLOWED_RAM * ONE_MB,
    },
    [PYTHON]: {
        compile: 'python -m compileall -q solution.py',
        run: 'python solution.py',
        timeout: 30,
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
    [PHP]: {
        compile: 'php -l solution.php',
        run: 'php solution.php',
        timeout: 15,
        filename: 'solution.php',
        memory: ALLOWED_RAM * ONE_MB,
    },
    [Perl]: {
        compile: 'perl -c solution.pl',
        run: 'perl solution.pl',
        timeout: 15,
        filename: 'solution.pl',
        memory: ALLOWED_RAM * ONE_MB,
    },
    [Bash]: {
        compile: 'bash -n solution.sh',
        run: 'bash solution.sh',
        timeout: 15,
        filename: 'solution.sh',
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
