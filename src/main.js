import readInput from "./utils/readInput.js";

async function main() {
  const { input, error, retry } = await readInput("이름을 입력해 주세요", [] )

  if (error) {
    console.error(error)
    const reInput = await retry()
    console.log(reInput)
  }
  else {
    console.log(input)
  }
}

main();
