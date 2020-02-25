import React, { useEffect } from 'react';
import { useRouter } from 'next/router';
// import { Paper } from '@material-ui/core';
// import fetch from 'isomorphic-unfetch';
import theme from '../../components/theme';
import Layout from '../../components/Layout';
import TopSection from '../../components/TopSection';
// import { isJWTValid, checkUserType } from '../../utils/apiRequests';
// import { pushErrorPage } from '../../utils/errorManagement';
// import CenteredCircularProgress from '../../components/CenteredCircularProgress';

export default function Result() {
  const router = useRouter();

  useEffect(() => {
    router.push('/referrals');
  });

  return (
    <Layout>
      <TopSection
        text="Redimir badge"
        color={theme.palette.primary.main}
        title
        pageTitle
      />
    </Layout>
  );
}

//   const router = useRouter();
//   const [isDone, setIsDone] = useState(false);
//   const [message, setMessage] = useState(false);

//   function attributeBadge(badgeID) {
//     const endpoint = `${process.env.ENDPOINT}${process.env.API_REFERRALS}`;
//     fetch(endpoint, {
//       method: 'POST',
//       headers: {
//         Authorization: `Bearer ${localStorage.getItem('jwt')}`,
//       },
//       body: JSON.stringify({
//         id: badgeID,
//       }),
//     }).then(
//       (res) => {
//         if (res.errors) {
//           pushErrorPage('Bad request', 'referral_bad_request');
//         } else {
//           setMessage(res.referral);
//           setIsDone(true);
//         }
//       },
//       () => pushErrorPage('Bad request', 'referral_bad_request'),
//     );
//   }

//   useEffect(() => {
//     if (router.query.id !== undefined) {
//       const badgeID = router.query.id;
//       isJWTValid(localStorage.jwt).then((valid) => {
//         if (!valid) {
//           pushErrorPage('Unauthorized', 'check_referrals');
//         } else {
//           checkUserType(localStorage.jwt).then((userType) => {
//             switch (userType) {
//               case 'company':
//                 pushErrorPage('Unauthorized', 'no_referrals_company');
//                 break;
//               default:
//                 attributeBadge(badgeID);
//                 break;
//             }
//           });
//         }
//       });
//     } else {
//       pushErrorPage('Unexpected', 'referrals_query');
//     }
//   }, [router]);

//   return (
//     <Layout>
//       <TopSection
//         text="Redimir badge"
//         color={theme.palette.primary.main}
//         title
//         pageTitle
//       />
//       v
//       {isDone ? (
//         <Paper color="primary">{message}</Paper>
//       ) : (
//         <CenteredCircularProgress />
//       )}
//     </Layout>
//   );
// }
