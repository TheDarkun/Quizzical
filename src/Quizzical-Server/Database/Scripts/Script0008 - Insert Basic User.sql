INSERT INTO user (email, password_hash, password_salt)
VALUES (
    'a@a.cz',
    'g7gELIkTisNsNPpZ/OCXl9yl+TIZdOpqHEdoJ0pPk4NKf7UBd8aFLmq+DjzGkhHQPf+RfSVH7GSUTvMMfcOnMQ==',
    'eJGiyTiE3+K5bqKkp/G5Jw=='
);

INSERT INTO profile (user_id, name)
VALUES (
   (SELECT id FROM user WHERE email = 'a@a.cz'),
   'a'
)