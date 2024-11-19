# GameRadar

The GameRadar is a full-stack web application sport calendar, where users can add and browse events.
It is a part of Sportradar Code Academy Coding Exercise (BE).

Each added event includes:
* (optional) event name
* sport type
* two participants (individuals / clubs)
* start time
* (optional) venue
* (optional) description
* (optional) ticket price
* creating user's e-mail address

## Screenshots

<p align="center">
<img width="800" alt="Screenshot 2024-11-19 at 13 17 17" src="https://github.com/user-attachments/assets/f9c8b849-d257-4e71-ad91-604ca42fafb7">
   <br>1. homepage<br>
<img width="800" alt="Screenshot 2024-11-19 at 13 17 27" src="https://github.com/user-attachments/assets/28efcb43-d134-412d-b3b1-2745d7ba806c">
<br>2. all the events<br>
<img width="800" alt="Screenshot 2024-11-19 at 13 18 15" src="https://github.com/user-attachments/assets/dc624141-85c5-4845-beee-8503d965f76d">
<br>3. single event<br>
<img width="800" alt="Screenshot 2024-11-19 at 13 17 35" src="https://github.com/user-attachments/assets/fb364ef4-19f5-4f97-beff-aead313d55dc">
<br>4. add new event form<br>
<img width="800" alt="Screenshot 2024-11-19 at 13 17 40" src="https://github.com/user-attachments/assets/1f24150a-245d-4dfd-ba8f-f10117940cf1">
<br>5. all the sports<br>
<img width="800" alt="Screenshot 2024-11-19 at 13 18 10" src="https://github.com/user-attachments/assets/616f5ce5-db10-4eb3-8c77-2c368bddcd3f">
<br>6. single sport<br>
<img width="800" alt="Screenshot 2024-11-19 at 13 17 44" src="https://github.com/user-attachments/assets/e6acf7ee-876c-46e0-8639-c1116df511c4">
<br>7. all the athletes/clubs<br>
<img width="800" alt="Screenshot 2024-11-19 at 13 18 03" src="https://github.com/user-attachments/assets/4b15d973-d078-4a20-aa9a-00a8a8a2697a">
<br>8. single club view<br>
<img width="800" alt="Screenshot 2024-11-19 at 13 17 50" src="https://github.com/user-attachments/assets/592532f2-92ac-4f38-b0ab-b1f6202f2ece">
<br>9. all the venues<br>
<img width="800" alt="Screenshot 2024-11-19 at 13 17 58" src="https://github.com/user-attachments/assets/a3bff66a-7900-4196-90c8-328c769aa03b">
<br>10. single venue<br>
</p>


## Technologies

- JavaScript
- TypeScript
- Next.js
- Tailwind
- Postgres.js
- Jest
- Playwright

GameRadar database follows the 3NF of database normalization.
Foreign keys are named using underscore as a prefix (eg. _user_id).

## Database Setup

If you don't have PostgreSQL installed yet, follow the instructions from the PostgreSQL step in [UpLeveled's System Setup Instructions](https://github.com/upleveled/system-setup/blob/master/readme.md).

Copy the `.env.example` file to a new file called `.env` (ignored from Git) and fill in the necessary information.

Then, connect to the built-in `postgres` database as administrator in order to create the database:

**Windows**

If it asks for a password, use `postgres`.

```bash
psql -U postgres
```

**macOS**

```bash
psql postgres
```

**Linux**

```bash
sudo -u postgres psql
```

Once you have connected, run the following to create the database:

```sql
CREATE DATABASE <database name>;
CREATE USER <user name> WITH ENCRYPTED PASSWORD '<user password>';
GRANT ALL PRIVILEGES ON DATABASE <database name> TO <user name>;
\connect <database name>
CREATE SCHEMA <schema name> AUTHORIZATION <user name>;
```

Quit `psql` using the following command:

```bash
\q
```

On Linux, it is [best practice to create an operating system user for each database](https://docs.redhat.com/en/documentation/red_hat_enterprise_linux/9/html/configuring_and_using_database_servers/using-postgresql_configuring-and-using-database-servers#con_postgresql-users_using-postgresql), to ensure that the operating system user can only access the single database and no other system resources. A different password is needed on Linux because [passwords of operating system users cannot contain the user name](https://github.com/upleveled/system-setup/issues/74). First, generate a random password and copy it:

```bash
openssl rand -hex 16
```

Then create the user, using the database user name from the previous section above. When you are prompted to create a password for the user, paste in the generated password.

```bash
sudo adduser <user name>
```

Once you're ready to use the new user, reconnect using the following command.

**Windows and macOS:**

```bash
psql -U <user name> <database name>
```

**Linux:**

```bash
sudo -u <user name> psql -U <user name> <database name>
```

**Migrations:**

Project includes dummy data that has to be inserted to newly created database. It can be easily done using ley's script:

```bash
pnpm migrate up
```

## Run Tests

To run end-to-end tests with Playwright, use the following command:

```bash
pnpm playwright test
```

## Possible further developments:
1. authentication / authorization (users profile with custom username and hashed password, sql create prompt already exists)
2. adding new: sports, participants, venues by users (sql create prompts already exist)
3. adding address completion, eg. MapBox API for new venues (location, latitude and longitude fields in sql already exist)
4. verification of user-added data: individual athlete vs individual athlete, club vs club, sport type matches participants etc.
5. adding Stripe API for payment of tickets
6. generating .ics files to save specific event in user's calendar

## Additional notes

1. Projected, created before coding first model of database relationships

![db_sample](https://github.com/user-attachments/assets/e3603516-af47-4ddd-9d4f-6b06f53ea24d)

2. All the dummy data and GameRadar logo was generated using [chatgpt](https://chatgpt.com/)

3. For more info, please contact https://github.com/xkrsx / markiewicz267@gmail.com
