import readInput from "./utils/readInput.js";

async function main() {
  const { input, error } = await readInput("이름을 입력해 주세요", [], 'once')

  if (error) {
    console.error(error)
  }
  else {
    console.log(input)
  }
}

main();
