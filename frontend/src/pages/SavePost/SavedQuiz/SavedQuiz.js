// import classNames from 'classnames/bind';
// import styles from './SavedQuiz.module.scss';
// import Row from 'react-bootstrap/Row';
// import Col from 'react-bootstrap/Col';
// import { Container } from 'react-bootstrap';
// import { useState, useEffect } from 'react';
// import {
//     collection,
//     onSnapshot,
//     doc,
//     deleteDoc,
//     query,
//     where,
// } from 'firebase/firestore';
// import { toast } from 'react-toastify';

// import { db } from '~/config/Firebase/firebase';

// import CardShowQuiz from '~/components/CardShowQuiz/CardShowQuiz';
// import Loading from '~/components/Loading/Loading';
// import Filter from '~/pages/TestUser/Filter';

// const cx = classNames.bind(styles);

// function SavedQuiz() {
//     ////State quiz from firebase
//     const [quiz, setQuiz] = useState([]);
//     //State when get API from firebase
//     const [loading, setLoading] = useState(true);
//     //
//     const [filtered, setFiltered] = useState([]);

//     //
//     const [activeGenre, setActiveGenre] = useState(0);
//     //State when get API from firebase
//     const quizCollectionRef = query(
//         collection(db, 'savepostquiz'),
//         where('item', '==', quiz.id),
//     );
//     //Firebase snapShot
//     useEffect(() => {
//         onSnapshot(quizCollectionRef, (snapshot) => {
//             setQuiz(
//                 snapshot.docs.map((doc) => {
//                     return {
//                         id: doc.id,
//                         viewing: false,
//                         ...doc.data(),
//                     };
//                 }),
//             );
//             setFiltered(
//                 snapshot.docs.map((doc) => {
//                     return {
//                         id: doc.id,
//                         viewing: false,
//                         ...doc.data(),
//                     };
//                 }),
//             );
//             setLoading(false);
//         });
//         // eslint-disable-next-line react-hooks/exhaustive-deps
//     }, []);
//     console.log(quiz);
//     const handleDelete = async (id) => {
//         if (window.confirm('Bạn có muốn xóa bài quiz ?')) {
//             try {
//                 setLoading(true);
//                 await deleteDoc(doc(db, 'savepostquiz', id));
//                 toast.success('Bài quiz đã được xóa thành công');
//                 setLoading(false);
//             } catch (err) {
//                 console.log(err);
//             }
//         }
//     };
//     return loading ? (
//         <Loading />
//     ) : (
//         <div className={cx('wrapper')}>
//             <Container className={cx('container')}>
//                 <h2 className={cx('heading')}>
//                     <Filter
//                         quiz={quiz}
//                         setFiltered={setFiltered}
//                         activeGenre={activeGenre}
//                         setActiveGenre={setActiveGenre}
//                     />
//                 </h2>
//                 <Row>
//                     {filtered.slice(0, 8).map((quiz, index) => {
//                         return (
//                             <Col key={index} lg={3} md={4} sm={6}>
//                                 <CardShowQuiz
//                                     quiz={quiz}
//                                     handleDelete={handleDelete}
//                                     iconDelete={quiz}
//                                     iconRepair={quiz}
//                                     iconRank={quiz}
//                                     titlRepair="Sửa"
//                                     titlDelete="Xóa"
//                                     titlRank="Rank"
//                                 ></CardShowQuiz>
//                             </Col>
//                         );
//                     })}
//                 </Row>
//             </Container>
//         </div>
//     );
// }

// export default SavedQuiz;
