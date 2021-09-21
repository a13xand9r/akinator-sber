import { Card, CardBody, CardContent, TextBox } from '@sberdevices/plasma-ui'

export const Question = ({text}: {text: string}) => {
  return (
    <Card>
    <CardBody style={{ height: '100%', alignItems: 'center' }}>
      <CardContent style={{ height: '100%' }} cover={false}>
        <TextBox>
          {text}
        </TextBox>
      </CardContent>
    </CardBody>
  </Card>
  )
}
