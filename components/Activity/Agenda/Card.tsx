import { TableCellAttachment } from 'mobx-lark';
import { observer } from 'mobx-react';
import { FC } from 'react';
import { Button, Card } from 'react-bootstrap';

import { Agenda } from '../../../models/Agenda';
import { blobURLOf } from '../../../models/Base';
import { i18n } from '../../../models/Translation';

const { t } = i18n;

export interface AgendaCardProps extends Agenda {
  activityId: string;
}

export const AgendaCard: FC<AgendaCardProps> = observer(
  ({ activityId, id, title, mentors, mentorAvatars, startTime, endTime }) => (
    <Card className="h-100">
      <div className="d-flex">
        {(mentorAvatars as unknown as TableCellAttachment[])?.map(file => (
          <Card.Img
            key={file.attachmentToken}
            className="object-fit-cover"
            style={{ height: '25rem' }}
            loading="lazy"
            src={blobURLOf([file])}
          />
        ))}
      </div>
      <Card.Body className="d-flex flex-column justify-content-end">
        <Card.Title
          as="a"
          className="text-decoration-none text-secondary text-truncation-lines"
          href={`/activity/${activityId}/agenda/${id}`}
        >
          {title}
        </Card.Title>

        <ul className="list-unstyled">
          <li>👨‍🎓 {(mentors as string[]).join(' ')}</li>
          <li>
            🕒 {new Date(+startTime!).toLocaleString()} ~{' '}
            {new Date(+endTime!).toLocaleString()}
          </li>
        </ul>
      </Card.Body>
      <Card.Footer className="d-flex justify-content-end">
        <Button href={`/activity/${activityId}/agenda/${id}/invitation`}>
          {t('share')}
        </Button>
      </Card.Footer>
    </Card>
  ),
);
