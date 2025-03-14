INSERT INTO user (email, password_hash, password_salt)
VALUES (
    'a@email.cz',
    'Tobm5N7nhc7IpNExTuHwYSLol/cVhUDjJLdeBZeIl0uapUGvW9YDEsajA0MEFuNgEyWNCsEC290yyws9jyVpdg==',
    'LilMAdFL+NfHEGAF3cL7IQ=='
);

INSERT INTO profile (user_id, name)
VALUES (
   (SELECT id FROM user WHERE email = 'a@email.cz'),
   'a'
)

-- name: a
-- email: a@email.cz
-- password: Heslo1234!