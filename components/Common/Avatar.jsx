import { defaultAvatar } from '@/core/utils/constants';
import Image from 'next/image';
import React from 'react'

const Avatar = ({ src, height = 25, width = 25, className, alt }) => {
  const link = src ? `${process.env.NEXT_PUBLIC_API_PUBLIC_URL}storage/users/${src}` : defaultAvatar;
  return (
    <Image
      height={height}
      width={width}
      className={className}
      alt={alt}
      src={link}
    />
  )
}

export default Avatar