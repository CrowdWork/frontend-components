import M from 'materialize-css'


const sidenav = document.querySelectorAll('.sidenav')
const useSideNav = M.Sidenav.getInstance(sidenav, {
    draggable: true,
    preventScrolling: true
})

export default useSideNav