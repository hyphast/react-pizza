import React from 'react'
import { Link } from 'react-router-dom'

type ContentInfoProps = {
  title: string
  desc?: string
  backBtn?: boolean
}
const ContentInfo: React.FC<ContentInfoProps> = ({ title, desc, ...rest }) => {
  const isBackBtnVisible = rest.backBtn === true

  return (
    <div className="content__info">
      <h2>
        {title} <span>😕</span>
      </h2>
      {desc && <p>{desc}</p>}
      {isBackBtnVisible && (
        <Link
          style={{ margin: '35px 0' }}
          to="/"
          className="button button--black"
        >
          <span>Вернуться назад</span>
        </Link>
      )}
    </div>
  )
}

ContentInfo.defaultProps = {
  backBtn: false,
  desc: '',
}

export default ContentInfo
