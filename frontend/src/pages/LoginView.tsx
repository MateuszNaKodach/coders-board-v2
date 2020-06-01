import React from 'react';
import { Card } from '@components/ant-design/Card';
import { Button } from '@components/ant-design/Button'
import { LoginGraphic } from '@components/svg'


export const LoginView = () => {
    return (
        <>
            <Card width={606} mt={88}>
                    <h1> Witaj w aplikacji CodersBoard </h1>
                    <p>Zaloguj się za pomocą e-maila w domenie CodersCrew</p>
                    <Button>Zaloguj się z Google</Button>
            </Card>
            <LoginGraphic/>

        </>

    )
}