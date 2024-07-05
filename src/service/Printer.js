export default class ConsolePrinter {
  constructor(template) {
    this.template = template;
  }

  format(templateKey, messages) {
    let result = this.template[templateKey];
    if (messages && messages.length > 0) {
      messages.forEach((message, index) => {
        result = result.replaceAll(`%{${index + 1}}`, message);
      });
    }
    return result;
  }

  print(...messages) {
    console.log(...messages);
  }

  printWithTemplate(templateKey, messages) {
    if (this.template.hasOwnProperty(templateKey)) {
      console.log(this.format(templateKey, messages));
    } else {
      console.log(...messages);
    }
  }

  lineBreak() {
    console.log('');
  }
}
