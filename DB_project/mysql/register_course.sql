/*
 * File name  : register_course.sql
 * Date       : 2020.10.28
 * Descrption : Register for new course
*/

###############여기서부터 수강신청 코드####################################    

#join이용하여 요일까지 나타내는 강의표 만들기 
select *
from course_info as c
join course_time as t
where c.학정번호= t.학정번호;

# 학생의 수강과목 보여주기
select *
from registered_course as c
join course_time as ct , course_info as ci
where c.학정번호= ct.학정번호 and c.학정번호=ci.학정번호 and c.학번=2013722085;

# 가상테이블 이용하여 자신이 수강하는 과목과 요일 시간이 겹치는 수업만 뽑아내기
select * from overlap;

select *
from course_time as ct, overlap as o
where ct.강의시간1=o.강의시간1 and ct.강의시간2=o.강의시간2 and ct.강의시간3=o.강의시간3 and o.학정번호<>ct.학정번호;

#학점이 24학점이 넘을 경우 수강신청 불가
select *from credit;

#선택한 과목의 학점과 학생이 수강하는 과목들의 학점을 더한 값 확인
select cre.학점+ci.학점
from credit as cre, course_info as ci
where cre.학번=2013722085 and ci.학정번호='1170-1-2957-01';

#학생의 수강신청 학점 확인
select sum(학점)
from registered_course as c
join course_info as ci
where c.학정번호=ci.학정번호 and c.학번=2013722085;

#학생 수강과목 추가시 강의시간 겹치는지, 중복되지 않는지, 학점이 24를 넘지 않는지 확인

#수강하는 과목과 강의시간이 겹쳐서 삽입이 되지 않는 것 확인
insert into registered_course select
2013722087,'1170-1-2957-01'
from credit as cre, course_info as ci
where not exists
(
select ct2.학정번호
from course_time as ct,course_time as ct2, course_info as ci
where (ct.학정번호='1170-1-2957-01' and ct.강의시간1=ct2.강의시간1 and ct.강의시간2 = ct2.강의시간2 and ct.강의시간3= ct2.강의시간3) 
and ct2.학정번호<>'1170-1-2957-01')
and cre.학번=2013722087 and ci.학정번호='1170-1-2957-01' and cre.학점+ci.학점 < 24;

#학점이 24를 넘지 않기 때문에 insert 되는 것을 확인할 수 있음
insert into registered_course select
2013722087,'H020-4-4181-01'
from credit as cre, course_info as ci
where not exists
(
select ct2.학정번호
from course_time as ct,course_time as ct2, course_info as ci
where (ct.학정번호='H020-4-4181-01' and ct.강의시간1=ct2.강의시간1 and ct.강의시간2 = ct2.강의시간2 and ct.강의시간3= ct2.강의시간3)
 and ct2.학정번호<>'H020-4-4181-01')
 and cre.학번=2013722087 and ci.학정번호='H020-4-4181-01' and cre.학점+ci.학점 < 24;
 
 select *
 from registered_course
 where registered_course.학번 = '2013722085'

# 해당 과목을 삭제
delete from registered_course
where 학번='2013722087' and 학정번호='1170-1-2957-01';

#학생이 수강하는 과목 수 조회
select 학번, count(*)
from registered_course
Group by 학번;