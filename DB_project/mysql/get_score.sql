/*
 * File name  : get_score.sql
 * Date       : 2020.10.28
 * Descrption : Get user score
				Detailed info of how to calculate the score : https://www.kw.ac.kr/ko/life/bachelor_info05.jsp
*/


-- # show all score table
-- select stu.학번, stu.이름, course.과목명, num_score.평점, grade.수강시기
-- from student_info as stu, course_info as course, student_grade as grade, grade_score as num_score
-- where stu.학번 = grade.학번 and grade.학정번호 = course.학정번호 and grade.성적 = num_score.등급
-- order by stu.학번;


# show student's score
-- select stu.학번, stu.이름, course.과목명, num_score.평점, grade.수강시기
-- from student_info as stu, course_info as course, student_grade as grade, grade_score as num_score
-- where stu.학번 = grade.학번 and grade.학정번호 = course.학정번호 and grade.성적 = num_score.등급 and stu.학번 = '2013722085'
-- order by
-- 	field(grade.수강시기, '1학년-1학기', '1학년-여름',  '1학년-2학기', '1학년-겨울',
--                         '2학년-1학기', '2학년-여름',  '2학년-2학기', '2학년-겨울',
--                         '3학년-1학기', '3학년-여름',  '3학년-2학기', '3학년-겨울',
--                         '4학년-1학기', '4학년-여름',  '4학년-2학기', '4학년-겨울'), 
-- 	grade.수강시기;


-- # show student's total average score
-- select stu.학번, avg(num_score.평점) as 평균평점
-- from student_info as stu, course_info as course, student_grade as grade, grade_score as num_score
-- where stu.학번 = grade.학번 and grade.학정번호 = course.학정번호 and grade.성적 = num_score.등급 and stu.학번 = '2013722085'


-- # show student's average score per semester
-- select grade.수강시기, avg(num_score.평점) as 학기평점
-- from student_info as stu, course_info as course, student_grade as grade, grade_score as num_score
-- where stu.학번 = grade.학번 and grade.학정번호 = course.학정번호 and grade.성적 = num_score.등급 and stu.학번 = '2013722085'
-- group by grade.수강시기
-- order by
-- 	field(grade.수강시기, '1학년-1학기', '1학년-여름',  '1학년-2학기', '1학년-겨울',
--                         '2학년-1학기', '2학년-여름',  '2학년-2학기', '2학년-겨울',
--                         '3학년-1학기', '3학년-여름',  '3학년-2학기', '3학년-겨울',
--                         '4학년-1학기', '4학년-여름',  '4학년-2학기', '4학년-겨울'), 
-- 	grade.수강시기;


-- # show student's average score per course type
-- select ctype.교양전공구분, avg(num_score.평점) as 과목평점
-- from student_info as stu, course_info as course, student_grade as grade, grade_score as num_score, course_type as ctype
-- where stu.학번 = grade.학번 and grade.학정번호 = course.학정번호 and grade.성적 = num_score.등급 and course.구분 = ctype.상세구분 and stu.학번 = '2013722085'
-- group by ctype.교양전공구분
-- order by ctype.교양전공구분 asc;