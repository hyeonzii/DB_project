/*
 * File name  : read_file.sql
 * Date       : 2020.11.01
 * Descrption : Read course data from 'course.csv'
*/
# Step 0. Disable safe update
set sql_safe_updates=0;

# Step 1. Place file in proper location
# --secure-file-priv option forces server to only read from specific location 
# You can see your location by execute this 
# To change this variable, open "C:\ProgramData\MySQL\MySQL Server 8.0\my.ini" and change "secure-file-priv=[path]" then restart mysql
# More info could be found here : https://dev.mysql.com/doc/refman/5.7/en/server-system-variables.html#sysvar_secure_file_priv
SHOW VARIABLES LIKE "secure_file_priv";

# Step 2. Create temp table
create table course_temp (
	학정번호 char(14) not null,
    과목명 varchar(30) not null,
    구분 char(2) not null,
    학점 int not null,
    교수 varchar(20) not null,
    강의장소 varchar(10),
    강의시간1 char(2) not null default 'no',
    강의시간2 char(2) not null default 'no',
    강의시간3 char(2) not null default 'no',
    primary key(학정번호)
);

# Step 3. Load data into temp table
load data
	infile 'C:/MySQL/course.csv'  # Read data from 'course.csv'
	into table course_temp        # into temp table
    character set utf8            # using utf-8 character set
    fields terminated by ','      # each field is seperated by comma
	lines terminated by '\n'      # each row is seperated by escape sequence
    ignore 1 lines                # ignore 1st line
    (학정번호, 과목명, 구분, 학점, 교수, 강의장소, @강의시간1, @강의시간2, @강의시간3)
    set
    강의시간1 = if(CHAR_LENGTH(@강의시간1) = 0, 'no', @강의시간1),
	강의시간2 = if(CHAR_LENGTH(@강의시간2) = 0, 'no', @강의시간2),
	강의시간3 = if(ascii(@강의시간3)=13, 'no', @강의시간3);
    
    
# Step 4. Copy data to designated tables
Insert into course_info
select 학정번호, 과목명, 구분, 교수, 학점, 강의장소
from course_temp;

Insert into course_time
select 학정번호, 강의시간1, 강의시간2, 강의시간3
from course_temp;

# Step 5. Drop temp table
drop table course_temp;

# Step 6. Check all data has been inserted correctly
select * from course_info as c left outer join course_time as t on c.학정번호 = t.학정번호