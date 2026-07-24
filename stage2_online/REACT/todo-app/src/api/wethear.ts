export async function fetchWeather(
  city: string,
): Promise<{ city: string; temperature: number }> {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({
        city,
        temperature: Math.floor(Math.random() * 30) + 10,
      });
    }, 1000);
  });
}

// function weather(city:any) {
//   return ({
//     city,
//     temperature: Math.floor(Math.random() * 30) + 10
//   })
// }
