// The html tag need the class "-live" in the live context

const isLive = document.documentElement.classList.contains("-live");

export default isLive;
