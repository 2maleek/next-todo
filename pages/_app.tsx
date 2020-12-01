import 'bootstrap/dist/css/bootstrap.min.css';
import Nav from '@/components/nav'

function MyApp({ Component, pageProps }) {
  return (
    <>
      <Nav/>
      <Component {...pageProps} />
    </>
  )
}

export default MyApp
