'use client'

import React, { useState } from 'react'
import { Button, Checkbox, Input } from '@nextui-org/react'
import classNames from 'classnames'
import Image from 'next/image'
import { toast } from 'sonner'
import { Login } from '@/server/api/users'
import { tryCatchFinally } from '@/util'
import styles from './loginStyle.module.scss'

const LoginIndex = () => {
  const [eml, setEml] = useState('')
  const [emlErrMsg, setEmlErrMsg] = useState('')
  const [pwd, setPwd] = useState('')
  const [pwdErrMsg, setPwdErrMsg] = useState('')
  const [loginLoading, setLoginLoading] = useState(false)

  const login = async () => {
    if (!isPass()) return
    setLoginLoading(true)
    const result = await tryCatchFinally(Login, () => setLoginLoading(false), {
      email: eml,
      password: pwd,
    })
    if (!result.isSuccess) {
      toast.error(result.error.message)
      return
    }
  }

  const changeEml = (e: string) => {
    if (emlErrMsg) {
      setEmlErrMsg('')
    }
    setEml(e)
  }

  const changePwd = (e: string) => {
    if (pwdErrMsg) {
      setPwdErrMsg('')
    }
    setPwd(e)
  }

  const isPass = () => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/ // 简单邮箱正则
    const passwordRegex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}$/ // 至少8位，包含大小写字母和数字

    const validations = [
      {
        value: eml,
        isValid: (val: string) => emailRegex.test(val),
        setError: setEmlErrMsg,
        message: '请输入符合要求的邮箱地址',
      },
      {
        value: pwd,
        isValid: (val: string) => passwordRegex.test(val),
        setError: setPwdErrMsg,
        message: '请输入符合要求的密码（至少8位，包含大小写字母和数字）',
      },
    ]

    let result = true

    validations.forEach(({ value, isValid, setError, message }) => {
      if (!value || !isValid(value)) {
        setError(message)
        result = false
      }
    })

    return result
  }

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
                className={classNames(styles['form-body-input'], {
                  [styles['form-body-input--error']]: !!emlErrMsg,
                })}
                type="email"
                value={eml}
                onValueChange={changeEml}
                isInvalid={!!emlErrMsg}
                errorMessage={emlErrMsg}
                color={!!emlErrMsg ? 'danger' : undefined}
                size="sm"
                radius="sm"
                isClearable
                autoComplete="off"
                placeholder="请输入邮箱"
              />
              <Input
                className={classNames(styles['form-body-input'], {
                  [styles['form-body-input--error']]: !!pwdErrMsg,
                })}
                type="password"
                value={pwd}
                onValueChange={changePwd}
                isInvalid={!!pwdErrMsg}
                errorMessage={pwdErrMsg}
                color={!!pwdErrMsg ? 'danger' : undefined}
                size="sm"
                radius="sm"
                isClearable
                autoComplete="off"
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
                isLoading={loginLoading}
                onClick={login}
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
