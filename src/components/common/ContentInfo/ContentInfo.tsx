import React from 'react'
import { Link } from 'react-router-dom'

type TContentInfoProps = {
  title: string
  desc?: string
  backBtn?: boolean
}
export const ContentInfo: React.FC<TContentInfoProps> = ({
  title,
  desc,
  ...rest
}) => {
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
