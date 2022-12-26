import type { FC } from 'react';
import { Row, Col, Card, Badge } from 'react-bootstrap';
import { TimeDistance, text2color } from 'idea-react';

import { TimeOption } from '../data';
import { blobURLOf } from '../../models/Base';
import type { BaseArticle } from '../../pages/api/article';

export interface ArticleCardProps extends BaseArticle {
  className?: string;
}

export const ArticleCard: FC<ArticleCardProps> = ({
  className = '',
  alias,
  title,
  author,
  tags,
  image,
  publishedAt,
}: ArticleCardProps) => (
  <Card className={`shadow-sm ${className}`}>
    <Card.Img
      variant="top"
      style={{ height: '30vh', objectFit: 'cover' }}
      src={blobURLOf(image)}
    />
    <Card.Body>
      <Card.Title as="h3" className="h4">
        <a
          className="text-decoration-none text-secondary"
          href={`/article/${alias}`}
        >
          {title}
        </a>
      </Card.Title>

      <Row className="mt-3">
        <Col
          as="a"
          className="text-decoration-none text-end"
          href={`/search?keywords=${author}`}
        >
          {author}
        </Col>
      </Row>
      <Row as="footer" className="small mt-3">
        <Col>
          {(tags + '').split(/\s+/).map(name => (
            <Badge
              as="a"
              key={name}
              className="text-decoration-none me-2"
              bg={text2color(name, ['light'])}
              href={`/search?tag=${name}`}
            >
              {name}
            </Badge>
          ))}
        </Col>
        <Col className="text-end">
          <TimeDistance
            className="me-3"
            {...TimeOption}
            date={publishedAt as number}
          />
        </Col>
      </Row>
    </Card.Body>
  </Card>
);
