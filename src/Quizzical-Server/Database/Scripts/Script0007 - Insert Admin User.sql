INSERT INTO user (email, password_hash, password_salt, is_admin)
VALUES (
    'admin@admin.cz',
    'g7gELIkTisNsNPpZ/OCXl9yl+TIZdOpqHEdoJ0pPk4NKf7UBd8aFLmq+DjzGkhHQPf+RfSVH7GSUTvMMfcOnMQ==',
    'eJGiyTiE3+K5bqKkp/G5Jw==',
    1
);

INSERT INTO profile (user_id, name) 
VALUES (
    (SELECT id FROM user WHERE email = 'admin@admin.cz'),
    'admin'
)