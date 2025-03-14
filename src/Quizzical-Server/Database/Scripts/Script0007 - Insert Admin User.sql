INSERT INTO user (email, password_hash, password_salt, is_admin)
VALUES (
    'admin@email.cz',
    'Tobm5N7nhc7IpNExTuHwYSLol/cVhUDjJLdeBZeIl0uapUGvW9YDEsajA0MEFuNgEyWNCsEC290yyws9jyVpdg==',
    'LilMAdFL+NfHEGAF3cL7IQ==',
    1
);

INSERT INTO profile (user_id, name) 
VALUES (
    (SELECT id FROM user WHERE email = 'admin@email.cz'),
    'admin'
)

-- name: admin
-- email: admin@email.cz
-- password: Heslo1234!