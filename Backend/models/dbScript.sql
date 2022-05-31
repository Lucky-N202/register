DROP TABLE IF EXISTS users CASCADE;
    CREATE TABLE users      
	  (	  user_id       SERIAL PRIMARY KEY,
	   	  role_id       INT NOT NULL,
		  username   	VARCHAR(255) NOT NULL,
		  surname    	VARCHAR(255) NOT NULL,
		  email		 	VARCHAR(255) UNIQUE NOT NULL,
		  passwrd   	VARCHAR(255),
		  status     	BOOLEAN DEFAULT 'true',
	   	  created_at	TIMESTAMPTZ NOT NULL DEFAULT NOW(),
		  updated_at	TIMESTAMPTZ NOT NULL DEFAULT NOW(),
		  images		VARCHAR(255),
	      FOREIGN KEY(role_id ) REFERENCES roles(role_id )
		);

DROP TABLE IF EXISTS roles CASCADE;
CREATE TABLE roles
     (       role_id 	SERIAL PRIMARY KEY,
			 user_roles		VARCHAR(255) NOT NULL,
			created_at	TIMESTAMPTZ NOT NULL DEFAULT NOW(),
			updated_at	TIMESTAMPTZ NOT NULL DEFAULT NOW()		 
	 );
	 
	 INSERT INTO roles(user_roles)
	             VALUES('admin');
	 INSERT INTO roles(user_roles)
	            VALUES ('employee');
	 INSERT INTO roles(user_roles)
	             VALUES('help_desk');
				 
 DROP TABLE IF EXISTS scanlogs CASCADE;
 CREATE TABLE scanlogs
 	   (     log_id 		SERIAL PRIMARY KEY,
 			 user_id 		INTEGER NOT NULL,
 			 scanned_at 	TIMESTAMPTZ NOT NULL DEFAULT NOW(),
 			 temperature 	NUMERIC(5,1),
 			 symptoms   	BOOLEAN,
			 scanned_by 	VARCHAR(255),
             FOREIGN KEY(user_id) REFERENCES users(user_id) 
		);