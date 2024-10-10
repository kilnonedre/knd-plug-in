'use client'

import React from 'react'
import { Button, Checkbox, Input } from '@nextui-org/react'
import Image from 'next/image'
import styles from './loginStyle.module.scss'

const LoginIndex = () => {
  return (
    <div className={styles['login']}>
      <div className={styles['login-panel']}>
        <div className={styles['login-panel-image']}>
          <Image src="/bg-clip.jpg" layout="fill" alt="" />
        </div>
        <div className={styles['login-panel-form']}>
          <div className={styles['form']}>
            <div className={styles['form-header']}>Welcome To Yume</div>
            <div className={styles['form-body']}>
              <Input
                className={styles['form-body-input']}
                type="email"
                size="sm"
                radius="sm"
                isClearable
                autoComplete="off"
                placeholder="请输入邮箱"
              />
              <Input
                className={styles['form-body-input']}
                type="password"
                size="sm"
                radius="sm"
                isClearable
                placeholder="请输入密码"
              />
            </div>
            <div className={styles['form-tip']}>
              <Checkbox size="sm" defaultSelected>
                记住账号
              </Checkbox>
              <p className={styles['form-tip-forget']}>忘记密码？</p>
            </div>
            <div className={styles['form-footer']}>
              <Button
                className={styles['form-footer-login']}
                color="primary"
                size="sm"
              >
                登录
              </Button>
              <Button
                className={styles['form-footer-register']}
                color="primary"
                size="sm"
                variant="bordered"
              >
                注册
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default LoginIndex
