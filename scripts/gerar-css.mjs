#!/usr/bin/env node
// Gera dist/tokens.css a partir de src/tokens (npm run build). Usa o TypeScript que o
// Node 24 executa direto (remoção de tipos), sem passo de compilação.
import { mkdirSync, writeFileSync } from 'node:fs';
import { gerarCss } from '../src/tokens/css.ts';

mkdirSync(new URL('../dist/', import.meta.url), { recursive: true });
const css = gerarCss();
writeFileSync(new URL('../dist/tokens.css', import.meta.url), css);
console.log(`dist/tokens.css: ${css.split('\n').length} linhas`);
