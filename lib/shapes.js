const inquirer = require('inquirer');
const fs = require('fs');

class LogoMaker {
  constructor() {
    this.text = '';
    this.textColor = '';
    this.shape = '';
    this.shapeColor = '';
  }

  static async promptUser() {
    const { text, textColor, shape, shapeColor } = await inquirer.prompt([
      {
        type: 'input',
        name: 'text',
        message: 'What is your text? (Up to three characters)',
        validate: function (value) {
          if (value.length > 3) {
            return 'Please enter up to three characters.';
          }
          return true;
        },
      },
      {
        type: 'input',
        name: 'textColor',
        message: 'What is the text color? (Color keyword or hexadecimal number)',
      },
      {
        type: 'list',
        name: 'shape',
        message: 'Choose a shape:',
        choices: ['circle', 'triangle', 'square'],
      },
      {
        type: 'input',
        name: 'shapeColor',
        message: 'What is the shape color? (Color keyword or hexadecimal number)',
      },
    ]);

    this.text = text;
    this.textColor = textColor;
    this.shape = shape;
    this.shapeColor = shapeColor;

    LogoMaker.generateSVG();
  }

  static generateSVG() { 
    let shapeTag;

    switch (this.shape) {
      case  'circle': 
        shapeTag =`<circle cx="150" cy="100" r="80" fill="${this.shapeColor}" />`
        break;
      case  'triangle': 
        shapeTag =`<polygon points="150, 18 244, 182 56, 182" fill="${this.shapeColor}" />`
        break;
      default:
        shapeTag = `<rect width="150" height="150" fill="${this.shapeColor}" />`
    }

    const svgContent = `<svg width="300" height="200">
      ${shapeTag}
      <text x="${this.shape === 'square' ? '75':'150'}" y="${this.shape === 'square' ? '90':'150'}" fill="${this.textColor}" text-anchor="middle"  font-size="50">${this.text}</text>
    </svg>`;

    fs.writeFile('logo.svg', svgContent, (err) => {
      if (err) throw err;
      console.log('Generated logo.svg');
    });
  }
}

// const logoMaker = new LogoMaker();
// logoMaker.promptUser();

module.exports = LogoMaker;