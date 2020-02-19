const animateMobileNav = active => {
    return {
      variants: {
        open: { scaleX: 1 },
        closed: { scaleX: 0 }
      },
      animate: active ? "open" : "closed"
    };
  };
  
  export default animateMobileNav;
  