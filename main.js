const acceptCookie = () => {
  var element = document.getElementById("cookie_bar");
  element.classList.add("hide");
  localStorage.setItem('cookie_bar_hide', false)
}

const checkCookie = () => {
  if (localStorage.getItem('cookie_bar_hide')) {
    var element = document.getElementById("cookie_bar");
    element.classList.add("hide");
  }
  const toastStatus = JSON.parse(localStorage.getItem('toast_status'));
  if (toastStatus?.hide) {
    checkStorageExp(toastStatus?.timestamp, 'toast_status')
  }
}

const animationOnScroll = document.querySelector(".animation-on-scroll");
const containerSelected = document.querySelector(".news-paper__toast");
const scrollOffset = 100;

const elementInView = (el, offset = 0) => {
  const elementTop = el.getBoundingClientRect().top;
  return (
    elementTop <=
    ((window.innerHeight || document.documentElement.clientHeight) - offset)
  );
};

const displayScrollElement = () => {
  containerSelected.classList.add("scrolled");
};

const hideScrollElement = () => {
  containerSelected.classList.remove("scrolled");
};

const handleScrollAnimation = () => {
  if (elementInView(animationOnScroll, scrollOffset)) {
    const toastStatus = JSON.parse(localStorage.getItem('toast_status'));
    if (!toastStatus?.hide) {
      displayScrollElement();
    }
  } else {
    hideScrollElement();
  }
}

const elementScrollContainer = document.getElementById("section__scroll");
elementScrollContainer.addEventListener('scroll', () => {
  handleScrollAnimation();
})

const closeToast = () => {
  const now = new Date();
  localStorage.setItem('toast_status', JSON.stringify({ hide: true, timestamp: now }));
  hideScrollElement();
}

const checkStorageExp = (timestamp, target) => {
  const now = new Date();
  var expiration = new Date(timestamp);
  expiration = expiration.setMinutes(expiration.getMinutes() + 10);
  if (now.getTime() > expiration) {
    localStorage.removeItem(target);
    hideScrollElement();
  } 
}

