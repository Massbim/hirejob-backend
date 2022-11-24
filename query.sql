CREATE TABLE worker(
    id VARCHAR(255) NOT NULL PRIMARY KEY,
    fullname VARCHAR(255) NOT NULL,
    password VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL,
    instagram VARCHAR (255) DEFAULT NULL,
    github VARCHAR (255) DEFAULT NULL,
    phonenumber VARCHAR NOT NULL,
    jobs TEXT DEFAULT NULL,
    worker TEXT DEFAULT NULL,
    position TEXT  DEFAULT NULL,
    address TEXT DEFAULT NULL,
    description TEXT DEFAULT NULL,
    skill VARCHAR DEFAULT NULL,
    image VARCHAR(300) DEFAULT NULL,
    active VARCHAR(255),
    role VARCHAR(50),
    id_experience TEXT,
    id_portfolio TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_ad TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    token_verify TEXT 
);

CREATE TABLE recruiter(
    id VARCHAR(255) NOT NULL PRIMARY KEY,
    fullname TEXT NOT NULL,
    password TEXT NOT NULL,
    email TEXT NOT NULL,
    phonenumber VARCHAR NOT NULL,
    company VARCHAR(255) NOT NULL,
    position TEXT NOT NULL,
    address TEXT DEFAULT NULL,
    company_description TEXT DEFAULT NULL,
    company_field VARCHAR(255) DEFAULT NULL,
    image TEXT,
    instagram VARCHAR(255) DEFAULT NULL,
    linkedin VARCHAR(255) DEFAULT NULL,
    active VARCHAR(100),
    id_worker TEXT,
    role VARCHAR(50),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
    

CREATE TABLE experience(
    id INT NOT NULL  PRIMARY KEY,
    position TEXT NOT NULL,
    name_company VARCHAR(200) NOT NULL,
    month_year VARCHAR(255) NOT NULL,
    job_description TEXT NOT NULL,
    id_worker varchar(200),
    image TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE portfolio (
    id varchar(255) NOT NULL PRIMARY KEY,
    name_app TEXT NOT NULL,
    repository TEXT NOT NULL,
    type TEXT DEFAULT NULL,
    image TEXT [],
    id_worker TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    
);

CREATE TABLE hirejob(
    id varchar(255) NOT NULL PRIMARY KEY,
    status TEXT NOT NULL,
    id_worker VARCHAR(255),
    id_recruiter VARCHAR(255),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMEsTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE testimoni (
     id TEXT NOT NULL,
     opini TEXT DEFAULT NULL,
     id_worker TEXT DEFAULT NULL
);