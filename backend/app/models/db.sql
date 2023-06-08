Create table institutes (
    id int not null auto_increment,
    name varchar(255) not null,
    password varchar(255) not null,
    roles json,
    primary key (id),
    unique (name)
);

create table users (
id int not null auto_increment,
name varchar(255) not null,
password varchar(255) not null,
instituteId int not null,
role varchar(255) not null,
parentId int not null,
children json,
remainingHours int,
primary key (id),
foreign key (instituteId) references institutes(id)
);

CREATE TABLE tasks (     
    id INT AUTO_INCREMENT PRIMARY KEY,     
    name VARCHAR(255),     
    parent_task_id INT DEFAULT -1,     
    child_task_ids JSON,     
    user_id INT,     
    reviewed INT DEFAULT 0,     
    comment VARCHAR(255) DEFAULT '',     
    progress INT DEFAULT 0,     
    description TEXT,     
    deadline DATE,     
    submission VARCHAR(255) DEFAULT '' 
);