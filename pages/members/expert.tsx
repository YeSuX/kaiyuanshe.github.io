import { observer } from 'mobx-react';
import { InferGetServerSidePropsType } from 'next';
import { useRouter } from 'next/router';
import { FC, useEffect } from 'react';
import { Container } from 'react-bootstrap';
import { scrollTo } from 'web-utility';

import { MemberStatic } from '../../components/Member/Static';
import PageHead from '../../components/PageHead';
import { ExpertModel } from '../../models/Expert';
import { i18n } from '../../models/Translation';
import { withTranslation } from '../api/base';

export const getServerSideProps = withTranslation(async () => {
  const data = await new ExpertModel().getStatic();

  return {
    props: { membersStaticData: JSON.parse(JSON.stringify(data)) }, // will be passed to the page component as props
  };
});

const MembersPage: FC<InferGetServerSidePropsType<typeof getServerSideProps>> =
  observer(({ membersStaticData }) => {
    const { groupMap, otherGroupList } = membersStaticData;
    const { t } = i18n;
    const { query } = useRouter();
    useEffect(() => {
      setTimeout(() => {
        scrollTo('#' + query!.anchor);
      }, 10);
    });

    return (
      <Container className="my-4">
        <PageHead title={t('expert_committee')} />

        <h1 className="w-100 my-5 text-center">{t('expert_committee')}</h1>

        <MemberStatic
          membersGroup={groupMap}
          otherMembersList={otherGroupList}
          query={query}
        />
      </Container>
    );
  });

export default MembersPage;
