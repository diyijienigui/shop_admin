import {
  LockOutlined,
  UserOutlined,
} from '@ant-design/icons';
import { Tabs } from 'antd';
import React from 'react';
import ProForm, {  ProFormText } from '@ant-design/pro-form';
import { connect, FormattedMessage ,history} from 'umi';
import styles from './index.less';
import { useEffect } from 'react';



const Login = (props) => {
  useEffect(()=>{
    // 如果已经登陆过，直接去首页
    const userInfo = localStorage.getItem('userInfo');
    if(userInfo) history.replace('/')
  },[])
  const { submitting } = props;

  const handleSubmit = (values) => {
    const { dispatch } = props;
    dispatch({
      // 调用model里面login命名空间的login方法
      type: 'login/login',
      payload: { ...values },
    });
  };

  return (
    <div className={styles.main}>
      <ProForm
        initialValues={{
          autoLogin: true,
        }}
        submitter={{
          render: (_, dom) => dom.pop(),
          submitButtonProps: {
            loading: submitting,
            size: 'large',
            style: {
              width: '100%',
            },
          },
        }}

        // 这里可以收到表单提交的数据
        onFinish={(values) => {
          // console.log(values)
          handleSubmit(values);
          return Promise.resolve();
        }}
      >
        <Tabs activeKey='account' >
          <Tabs.TabPane
            key="account"
            tab="账户密码登录"
          />
          </Tabs>

            <ProFormText
              name="email"
              fieldProps={{
                size: 'large',
                prefix: <UserOutlined className={styles.prefixIcon} />,
              }}
              placeholder ='邮箱:super@a.com'

              rules={[
                {
                  required: true,
                  message: (
                    <FormattedMessage
                      id="pages.login.username.required"
                      defaultMessage="请输入邮箱"
                    />
                  ),
                },
                {
                  type: 'email',
                  message: "请输入正确邮箱格式"
                },
              ]}
            />
            <ProFormText.Password
              name="password"
              fieldProps={{
                size: 'large',
                prefix: <LockOutlined className={styles.prefixIcon} />,
              }}
              placeholder = 'Password: 123123'
            
              rules={[
                {
                  required: true,
                  message: (
                    <FormattedMessage
                      id="pages.login.password.required"
                      defaultMessage="Please enter password！"
                    />
                  ),
                },
              ]}
            />

      </ProForm>
    </div>
  );
};

export default connect(({ login, loading }) => ({
  userLogin: login,
  submitting: loading.effects['login/login'],
}))(Login);
