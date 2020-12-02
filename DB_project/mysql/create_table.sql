/*
 * File name  : create_table.sql
 * Date       : 2020.10.28
 * Descrption : Create tables and insert sample data
*/

use student_table;

/* Create base tables */
create table student_info (
	학번 int unsigned not null,
    이름 varchar(20) not null,
    아이디 varchar (20) unique not null,
    비밀번호 varchar(50) not null,
    학과 varchar(40) not null,
    전화번호 varchar(15) not null,
    메일 varchar(30) not null,
	primary key(학번)
);

create table course_info (
	학정번호 char(14) not null,
    과목명 varchar(30) not null,
    구분 char(2) not null,
    교수 varchar(20) not null,
    학점 int not null,
    강의장소 varchar(10),
    primary key(학정번호)
);

create table course_time (
	학정번호 char(14) not null,
    강의시간1 char(2) not null default 'no',
    강의시간2 char(2) not null default 'no',
    강의시간3 char(2) not null default 'no',
    primary key(학정번호),
    foreign key (학정번호) references course_info(학정번호)
		on update cascade
        on delete restrict
);

create table registered_course (
    학번 int unsigned not null,
    학정번호 char(14) not null,
    primary key(학번, 학정번호),
    foreign key (학번) references student_info(학번)
		on update cascade
		on delete restrict,
    foreign key (학정번호) references course_info(학정번호)
		on update cascade
		on delete restrict
);

create table student_grade (
    학번 int unsigned not null,
    학정번호 char(14) not null,
    성적 varchar(2) not null,
    수강시기 varchar(12) not null,
    primary key(학번, 학정번호),
    foreign key (학번) references student_info(학번)
		on update cascade
        on delete restrict,
    foreign key (학정번호) references course_info(학정번호)
		on update cascade
        on delete restrict
);

create table notice_board (
	고유번호 int not null auto_increment,
    학정번호 char(14) not null,
    제목 varchar(100) not null,
    게시자 varchar(20) not null,
    내용 mediumtext,
    작성시간 datetime not null default now(),
    primary key(고유번호),
    foreign key (학정번호) references course_info(학정번호)
		on update cascade
        on delete restrict
);

create table grade_score (
	등급 varchar(2) not null,
    평점 float not null,
    primary key(등급)
);

create table course_type (
	상세구분 varchar(8) not null,
    교양전공구분 varchar(4) not null,
    primary key(상세구분)
);


/* Insert sample data */
insert into student_info values
	(2013722085, '김영윤', 'sample_id1', 'mypassword1', '컴퓨터정보공학부', '01011112222', 'sample_id1@kw.ac.kr'),
    (2017722001, '홍길동', 'sample_id2', 'mypassword2', '건축공학과', '01033334444', 'sample_id2@gmail.com'),
    (2015722048, '김영희', 'sample_id3', 'mypassword3', '인터랙티브미디어커뮤니케이션전공', '01055556666', 'sample_id3@naver.com');

insert into course_info values
	('H000-1-3362-01', '대학영어', '교필', '이종국', 3, null),
	('H020-4-4181-01', '데이터베이스및응용', '전선', '이기훈', 3, '새빛203'),
	('3230-2-9687-01', '커뮤니케이션탐구방법', '전필', '임소영', 3, '한울117'),
    ('1170-1-2957-01', '공학설계입문', '기필', '최창호', 3, '화도414'),
	('0000-1-5909-01', '공학과디자인', '교선', '유미란', 3, '참빛102'),
	('0000-1-3814-03', '영화의이해', '교선', '이대범', 3, '새빛204'),
    ('0000-2-3037-01', '대학영문법', '교선', '김용범', 3, null),
    ('6000-1-3095-03', '융합적사고와글쓰기', '교필', '박판식', 3, '화도415'),
    ('6050-4-2850-01', '유기분광학', '전선', '김인태', 3, '비마304'),
	('H020-2-3712-03', '데이터구조실습', '전선', '이형근', 1, '새빛303'),
    ('H020-2-8087-03', '컴퓨터공학기초실험2', '전선', '이준환', 2, '새빛304'),
	('H020-4-6897-01', 'Human Computer Interaction', '전선', '이성원', 3, '새빛102');

insert into course_time values
	('H000-1-3362-01', '월1', '수2', 'no'),
	('H020-4-4181-01', '월6', '수7', 'no'),
    ('3230-2-9687-01', '화2', '목1', 'no'),
    ('1170-1-2957-01', '월3', '월4', 'no'),
    ('0000-1-5909-01', '화5', '목6', 'no'),
	('0000-1-3814-03', '월7', '월8', '월9'),
    ('0000-2-3037-01', 'no', 'no', 'no'),
    ('6000-1-3095-03', '월6', '수5', 'no'),
    ('6050-4-2850-01', '화5', '목6', 'no'),
	('H020-2-3712-03', '수6', '수7', 'no'),
    ('H020-2-8087-03', '금5', '금6', '금7'),
    ('H020-4-6897-01', '월4', '수3', 'no');

insert into registered_course values
	(2013722085, 'H020-4-4181-01'),
    (2017722001, 'H000-1-3362-01'),
    (2013722085, 'H000-1-3362-01'),
    (2017722001, '3230-2-9687-01'),
    (2013722085, '0000-2-3037-01'),
    (2013722085, '6000-1-3095-03'),
    (2013722085, '6050-4-2850-01'),
    (2013722085, 'H020-2-8087-03'),
    (2013722085, 'H020-4-6897-01'),
    (2013722085, '3230-2-9687-01');

insert into student_grade values
	(2013722085, 'H020-4-6897-01', 'D-', '4학년-1학기'),
    (2017722001, 'H020-2-8087-03', 'B+', '3학년-2학기'),
    (2013722085, 'H020-2-3712-03', 'A0', '4학년-1학기'),
    (2013722085, '6050-4-2850-01', 'C+', '3학년-2학기'),
    (2017722001, '6000-1-3095-03', 'A+', '3학년-2학기'),
    (2013722085, '0000-2-3037-01', 'D-', '3학년-겨울'),
    (2013722085, '0000-1-3814-03', 'A+', '3학년-2학기'),
    (2013722085, 'H000-1-3362-01', 'F', '3학년-겨울'),
    (2013722085, '0000-1-5909-01', 'A+', '4학년-여름'),
    (2017722001, '1170-1-2957-01', 'A+', '4학년-1학기'),
    (2017722001, '3230-2-9687-01', 'C+', '3학년-2학기'),
    (2017722001, 'H020-4-4181-01', 'B0', '4학년-여름');

insert into notice_board(학정번호, 제목, 게시자, 내용) values
	('H000-1-3362-01', 'sample text1', 'admin', 'notice board test1'),
    ('H020-4-4181-01', 'sample text2', 'admin', 'notice board test2'),
    ('3230-2-9687-01', 'sample text3', 'admin', 'notice board test3'),
    ('1170-1-2957-01', 'sample text4', 'admin', 'notice board test4');
    
insert into grade_score(등급, 평점) values
	('A+', 4.5),
    ('A-', 4.0),
    ('B+', 3.5),
    ('B-', 3.0),
    ('C+', 2.5),
    ('C-', 2.0),
    ('D+', 1.5),
    ('D-', 1.0),
    ('F', 0);
    
insert into course_type(상세구분, 교양전공구분) values
	('교필', '교양'),
    ('교선', '교양'),
    ('기필', '교양'),
    ('기선', '교양'),
    ('전필', '전공'),
    ('전선', '전공');
    
    
/* Create view */
# 가상테이블 overlap 생성
create view overlap as
select ct.학정번호, ct.강의시간1, ct.강의시간2, ct.강의시간3
from registered_course as c ,course_time as ct
where c.학번='2013722085' and c.학정번호 = ct.학정번호;

#가상테이블로 각 학생의 총 학점 정보를 가진 테이블 생성
create view credit as
select c.학번, sum(ci.학점) as 학점
from registered_course as c
join course_info as ci
where c.학정번호=ci.학정번호
group by c.학번;
    
