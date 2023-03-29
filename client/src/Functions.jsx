async function convertAsyncIterableToString(asyncIterable) {
  const decoder = new TextDecoder();
  let result = {};
  for await (const chunk of asyncIterable) {
    let temp = decoder.decode(chunk, { stream: true });
    return temp;
  }
  result = { ...result };
  return result;
}

export default { convertAsyncIterableToString };
