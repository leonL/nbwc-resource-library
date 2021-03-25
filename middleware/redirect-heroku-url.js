export default function (context) {
  if (process.server) {
    const hostname = context.req.headers.host
    console.log(`The hostname of the requested URL is ${hostname}`)
    if (hostname === 'nbwc-cfnb.herokuapp.com') {
      context.redirect(301, `https://www.bibliothequecovidlibrary.ca${context.req.url}`)
    }
  }
}