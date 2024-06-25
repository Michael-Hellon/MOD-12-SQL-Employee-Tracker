INSERT INTO DEPARTMENT (
    NAME
) VALUES (
    'Sales'
),
(
    'Engineering'
),
(
    'Fianance'
),
(
    'Legal'
);

INSERT INTO ROLE (
    TITLE,
    SALARY,
    DEPARTMENT_ID
) VALUES (
    'Sales Lead',
    100000,
    1
),
(
    'Salesperson',
    80000,
    1
),
(
    'Lead Engineer',
    150000,
    2
),
(
    'Software Engineer',
    120000,
    2
),
(
    'Account Manager',
    160000,
    3
),
(
    'Accountant',
    125000,
    3
),
(
    'Legal Team Lead',
    250000,
    4
),
(
    'Lawyer',
    190000,
    4
);

INSERT INTO EMPLOYEE(
    FIRST_NAME,
    LAST_NAME,
    ROLE_ID,
    MANAGER_ID
) VALUES (
    'John',
    'Doe',
    1
),
(
    'Mike',
    'Chan',
    2,
    1
),
(
    'Ashley',
    'Rodriquez',
    3
),
(
    'Kevin',
    'Tupik',
    4,
    3
),
(
    'Kunal',
    'Singh',
    5
),
(
    'Malia',
    'Brown',
    6,
    5
),
(
    'Sarah',
    'Lourd',
    7
),
(
    'Tom',
    'Allen',
    8,
    7
);