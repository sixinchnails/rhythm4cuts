// Home.js
import React, { useState } from "react";
import { Link } from "react-router-dom";
import { BsLock, BsHammer } from "react-icons/bs";
import { FaUserPlus } from "react-icons/fa";

function GameList() {
  // 친구 추가 모달 상태를 관리하기 위한 useState
  //   let [showAddFriendModal, setShowAddFriendModal] = useState(false);
  //   // 방 만들기 모달 상태를 관리하기 위한 useState
  //   let [showCreateRoomModal, setShowCreateRoomModal] = useState(false);
  //   // 비밀방 체크 여부 상태 추가
  //   const [isSecretRoom, setIsSecretRoom] = useState(false);
  //   // 친구 추가 모달을 띄우는 함수
  //   let handleShowAddFriendModal = () => {
  //     setShowAddFriendModal(true);
  //   };
  //   // 친구 추가 모달을 닫는 함수
  //   let handleCloseAddFriendModal = () => {
  //     setShowAddFriendModal(false);
  //   };
  //   // 방 만들기 모달을 띄우는 함수
  //   let handleShowCreateRoomModal = () => {
  //     setShowCreateRoomModal(true);
  //   };
  //   // 방 만들기 모달을 닫는 함수
  //   let handleCloseCreateRoomModal = () => {
  //     setShowCreateRoomModal(false);
  //   };
  //   // 비밀방 토글 함수
  //   let handleSecretRoomToggle = e => {
  //     setIsSecretRoom(e.target.checked);
  //   };
  //   // 친구 추가 버튼을 눌렀을 때 수행될 함수
  //   let handleAddFriend = () => {
  //     // 친구 닉네임을 가져와서 추가하는 동작
  //     // const friendNickname = document.getElementById("friendNickname").value;
  //     // console.log("친구 추가:", friendNickname);
  //     // 모달 닫기
  //     handleCloseAddFriendModal();
  //   };
  //   return (
  //     <div
  //       style={{
  //         backgroundImage: `url("/images/Game_List.jpg")`,
  //         backgroundSize: "cover",
  //         backgroundRepeat: "no-repeat",
  //         backgroundPosition: "center",
  //         width: "100vw",
  //         height: "100vh",
  //       }}
  //     >
  //       {/* 위쪽 컨테이너 */}
  //       <Row className="m-3">
  //         <Col>
  //           {/* 다른 경로로 이동할 이미지를 클릭 가능하게 하기 위해 Link 컴포넌트로 감싸기 */}
  //           <Link to="/">
  //             <img
  //               src="/images/Home_Logo.png"
  //               alt="Home"
  //               style={{ width: "200px" }}
  //             />
  //           </Link>
  //         </Col>
  //           {/* 다른 경로로 이동할 이미지를 클릭 가능하게 하기 위해 Link 컴포넌트로 감싸기 */}
  //           <Link to="/GameWaiting">
  //           GameWaiting로 이동
  //           </Link>
  //       </Row>
  //       {/* 아래 컨테이너 */}
  //       <Container>
  //         <Row>
  //           {/* 왼쪽 컨테이너, 비율 : 9 */}
  //           <Col lg={9}>
  //             {/* 검색 부분 */}
  //             <Container>
  //               <Card.Header className="d-flex justify-content-end">
  //                 <input
  //                   type="text"
  //                   placeholder="방 번호를 입력하세요"
  //                   style={{ width: "20%" }}
  //                 />
  //                 <Button variant="primary">검색</Button>
  //               </Card.Header>
  //             </Container>
  //             {/* 리스트 부분 : 서버에서 가져올 예정 */}
  //             <Row>
  //               <Col lg={6}>
  //                 <ListContainer title="컨테이너 1" />
  //               </Col>
  //               <Col lg={6}>
  //                 <ListContainer title="컨테이너 2" />
  //               </Col>
  //             </Row>
  //             <Row>
  //               <Col lg={6}>
  //                 <ListContainer title="컨테이너 3" />
  //               </Col>
  //               <Col lg={6}>
  //                 <ListContainer title="컨테이너 4" />
  //               </Col>
  //             </Row>
  //             <Row>
  //               <Col lg={6}>
  //                 <ListContainer title="컨테이너 5" />
  //               </Col>
  //               <Col lg={6}>
  //                 <ListContainer title="컨테이너 6" />
  //               </Col>
  //             </Row>
  //           </Col>
  //           {/* 오른쪽 컨테이너, 비율 : 3 */}
  //           <Col lg={3}>
  //             <Row className="mb-3">
  //               <Col>
  //                 <Card>
  //                   <ButtonGroup size="sm">
  //                     <Button onClick={handleShowCreateRoomModal}>
  //                       방 만들기
  //                     </Button>
  //                     <Button>빠른 입장</Button>
  //                   </ButtonGroup>
  //                 </Card>
  //               </Col>
  //             </Row>
  //             <Row>
  //               <Col>
  //                 <Card>
  //                   <Card.Body
  //                     className="d-flex flex-column align-items-center"
  //                     style={{ height: "500px" }}
  //                   >
  //                     <Card.Title>유민국</Card.Title>
  //                     <Button
  //                       variant="primary"
  //                       onClick={handleShowAddFriendModal}
  //                       className="mb-3"
  //                     >
  //                       친구추가
  //                     </Button>
  //                     <Container>
  //                       <Row style={{ padding: "2px" }}>
  //                         <Col lg={2}>
  //                           {/* 친구 상태를 나타내는 아이콘 등을 추가 */}
  //                           <span style={{ fontSize: "2px" }}>🟢</span>
  //                         </Col>
  //                         <Col lg={10}>친구 이름</Col>
  //                       </Row>
  //                       <Row style={{ padding: "2px" }}>
  //                         <Col lg={2}>
  //                           {/* 친구 상태를 나타내는 아이콘 등을 추가 */}
  //                           <span style={{ fontSize: "2px" }}>🟢</span>
  //                         </Col>
  //                         <Col lg={10}>친구 이름</Col>
  //                       </Row>
  //                       <Row style={{ padding: "2px" }}>
  //                         <Col lg={2}>
  //                           {/* 친구 상태를 나타내는 아이콘 등을 추가 */}
  //                           <span style={{ fontSize: "2px" }}>🟢</span>
  //                         </Col>
  //                         <Col lg={10}>친구 이름</Col>
  //                       </Row>
  //                       <Row style={{ padding: "2px" }}>
  //                         <Col lg={2}>
  //                           {/* 친구 상태를 나타내는 아이콘 등을 추가 */}
  //                           <span style={{ fontSize: "2px" }}>⚫</span>
  //                         </Col>
  //                         <Col lg={10}>친구 이름</Col>
  //                       </Row>
  //                       <Row style={{ padding: "2px" }}>
  //                         <Col lg={2}>
  //                           {/* 친구 상태를 나타내는 아이콘 등을 추가 */}
  //                           <span style={{ fontSize: "2px" }}>⚫</span>
  //                         </Col>
  //                         <Col lg={10}>친구 이름</Col>
  //                       </Row>
  //                     </Container>
  //                   </Card.Body>
  //                 </Card>
  //               </Col>
  //             </Row>
  //           </Col>
  //         </Row>
  //       </Container>
  //       {/* 방 만들기 모달 */}
  //       <Modal show={showCreateRoomModal} onHide={handleCloseCreateRoomModal}>
  //         <Modal.Header closeButton>
  //           <Modal.Title>
  //             {/* 원하는 아이콘을 넣으려면 아이콘 컴포넌트를 사용하세요 */}
  //             <BsHammer
  //               name="your-icon-name"
  //               size={24}
  //               style={{ marginRight: "10px" }}
  //             />
  //             방 만들기
  //           </Modal.Title>
  //         </Modal.Header>
  //         <Modal.Body>
  //           {/* 1행 : 방 제목 */}
  //           <Form.Group controlId="roomTitle">
  //             <Form.Label>방 제목</Form.Label>
  //             <Form.Control type="text" placeholder="방 제목을 입력하세요." />
  //           </Form.Group>
  //           {/* 2행 : 노래 제목 */}
  //           <Form.Group controlId="songTitle">
  //             <Form.Label>노래 제목</Form.Label>
  //             <Form.Control type="text" placeholder="노래 제목을 입력하세요." />
  //           </Form.Group>
  //           {/* 3행 : 모드 (일반 방, 비밀 방) */}
  //           <Form.Group controlId="roomMode">
  //             <Form.Check
  //               type="checkbox"
  //               label="비밀방"
  //               onChange={handleSecretRoomToggle}
  //             />
  //           </Form.Group>
  //           {/* 4행 : 비밀 방 토글을 누르면 생성되는 비밀번호 입력란 */}
  //           {isSecretRoom && ( // 비밀방이 체크되었을 때만 비밀번호 입력란 보여주기
  //             <Form.Group controlId="roomPassword">
  //               <Form.Label>비밀번호</Form.Label>
  //               <Form.Control
  //                 type="password"
  //                 placeholder="비밀번호를 입력하세요."
  //               />
  //             </Form.Group>
  //           )}
  //         </Modal.Body>
  //         <Modal.Footer>
  //           <Button variant="primary" onClick={handleCloseCreateRoomModal}>
  //             방 만들기
  //           </Button>
  //           <Button variant="secondary" onClick={handleCloseCreateRoomModal}>
  //             취소
  //           </Button>
  //         </Modal.Footer>
  //       </Modal>
  //       {/* 친구추가 모달 */}
  //       <Modal show={showAddFriendModal} onHide={handleCloseAddFriendModal}>
  //         <Modal.Header closeButton>
  //           <FaUserPlus size={24} style={{ marginRight: "10px" }} />
  //           <Modal.Title>친구 추가</Modal.Title>
  //         </Modal.Header>
  //         <Modal.Body>
  //           <Form>
  //             {/* controlId : Form.Control을 연결 */}
  //             <Form.Group controlId="friendNickname">
  //               <Form.Label>닉네임</Form.Label>
  //               <Form.Control
  //                 type="text"
  //                 placeholder="친구 닉네임을 입력하세요."
  //               />
  //             </Form.Group>
  //           </Form>
  //         </Modal.Body>
  //         <Modal.Footer>
  //           {/* 닉네임이 없을 경우 경고창 예정 */}
  //           <Button variant="primary" onClick={handleAddFriend}>
  //             친구 추가
  //           </Button>
  //         </Modal.Footer>
  //       </Modal>
  //     </div>
  //   );
  // }
  // function ListContainer() {
  //   return (
  //     <Row>
  //       {/* 왼쪽 컨테이너 - 프로필 사진 */}
  //       <Col lg={3}>
  //         <div
  //           style={{
  //             display: "flex",
  //             flexDirection: "column",
  //             alignItems: "center",
  //           }}
  //         >
  //           <img
  //             src="/images/잔나비.jfif"
  //             alt="사랑하긴했었나요"
  //             style={{ width: "100px", borderRadius: "100%" }}
  //           />
  //         </div>
  //       </Col>
  //       {/* 오른쪽 컨테이너 - 3행의 컨테이너 */}
  //       <Col lg={9}>
  //         <Container>
  //           <Row style={{ padding: "2px" }}>
  //             <Col>
  //               <Card>
  //                 <Card.Body>
  //                   <Row>
  //                     <Col lg={3}>
  //                       <Card> num </Card>
  //                     </Col>
  //                     <Col>방 제목</Col>
  //                   </Row>
  //                 </Card.Body>
  //               </Card>
  //             </Col>
  //           </Row>
  //           <Row style={{ padding: "2px" }}>
  //             <Col>
  //               <Card style={{ textAlign: "center" }}>노래 제목</Card>
  //             </Col>
  //           </Row>
  //           <Row style={{ padding: "2px" }}>
  //             <Col>
  //               <Card>
  //                 <Card.Body>
  //                   <div style={{ textAlign: "center" }}>3 / 4</div>
  //                 </Card.Body>
  //               </Card>
  //             </Col>
  //             <Col>
  //               <Card>
  //                 <Card.Body className="d-flex">
  //                   <BsLock style={{ marginLeft: "auto" }} />
  //                 </Card.Body>
  //               </Card>
  //             </Col>
  //           </Row>
  //         </Container>
  //       </Col>
  //     </Row>
  //   );
}

export default GameList;
