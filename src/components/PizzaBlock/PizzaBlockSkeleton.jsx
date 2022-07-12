import React from 'react'
import ContentLoader from 'react-content-loader'

const MyLoader = (props) => (
  <ContentLoader
    speed={2}
    width={280}
    height={467}
    className="pizza-block"
    viewBox="0 0 280 467"
    backgroundColor="#f3f3f3"
    foregroundColor="#ecebeb"
    {...props}
  >
    <rect x="7" y="324" rx="0" ry="0" width="267" height="82" />
    <rect x="7" y="431" rx="0" ry="0" width="90" height="26" />
    <rect x="125" y="419" rx="21" ry="21" width="150" height="45" />
    <rect x="6" y="277" rx="0" ry="0" width="268" height="27" />
    <circle cx="144" cy="133" r="130" />
  </ContentLoader>
)

export default MyLoader
