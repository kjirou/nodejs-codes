#!/usr/bin/env node

var term = require('terminal-kit').terminal;

term('Hello world!\n');

term.red('red');

term.bold('bold');

term.bold.underline.red('mixed');

term( "My name is " ).red( "Jack" )( " and I'm " ).green( "32\n" ) ;

term( 'The terminal size is %dx%d' , term.width , term.height ) ;

term.moveTo( 1 , 1 ) ;

term.moveTo( 1 , 1 , 'Upper-left corner' ) ;

term.moveTo( 1 , 1 , "My name is %s, I'm %d.\n" , 'Jack' , 32 ) ;

term.moveTo.cyan( 1 , 1 , "My name is %s, I'm %d.\n" , 'Jack' , 32  ) ;
