# Here we set up the build for the MYSQL container, we simply establish the ROOT password
#   as some random password when the container is created for the first time.
# We also copy over the start up sql script that will create the DB exactly how we want it
#   for the first run with tables and a user to access it.
# Lastly we also expose the port to our MYSQL DB, 3306, and specify our start up command.
# Docker compose handles all the cross platform persistence via volumes so we don't need to worry about
#   the SQL server loosing files after it shuts down.

# We are using MySQL 8
FROM mysql:8

# Establish MySQL DB as environment variable
ENV MYSQL_DATABASE=db
ENV MYSQL_RANDOM_ROOT_PASSWORD=1

# Copy in first run SQL scripts
COPY ./init.sql /docker-entrypoint-initdb.d/

EXPOSE 3306