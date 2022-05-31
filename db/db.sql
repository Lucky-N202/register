PGDMP                         z            ontime    13.4 (Debian 13.4-1.pgdg100+1)    14.2     �           0    0    ENCODING    ENCODING        SET client_encoding = 'UTF8';
                      false            �           0    0 
   STDSTRINGS 
   STDSTRINGS     (   SET standard_conforming_strings = 'on';
                      false            �           0    0 
   SEARCHPATH 
   SEARCHPATH     8   SELECT pg_catalog.set_config('search_path', '', false);
                      false            �           1262    90173    ontime    DATABASE     Z   CREATE DATABASE ontime WITH TEMPLATE = template0 ENCODING = 'UTF8' LOCALE = 'en_US.utf8';
    DROP DATABASE ontime;
                adelaide    false            �            1259    91642    roles    TABLE     �   CREATE TABLE public.roles (
    role_id integer NOT NULL,
    user_roles character varying(255) NOT NULL,
    created_at timestamp with time zone DEFAULT now() NOT NULL,
    updated_at timestamp with time zone DEFAULT now() NOT NULL
);
    DROP TABLE public.roles;
       public         heap    adelaide    false            �            1259    91640    roles_role_id_seq    SEQUENCE     �   CREATE SEQUENCE public.roles_role_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 (   DROP SEQUENCE public.roles_role_id_seq;
       public          adelaide    false    203            �           0    0    roles_role_id_seq    SEQUENCE OWNED BY     G   ALTER SEQUENCE public.roles_role_id_seq OWNED BY public.roles.role_id;
          public          adelaide    false    202            �            1259    91783    scanlogs    TABLE     �   CREATE TABLE public.scanlogs (
    log_id integer NOT NULL,
    user_id integer NOT NULL,
    scanned_at timestamp with time zone DEFAULT now() NOT NULL,
    temperature numeric(5,1),
    symptoms boolean,
    scanned_by character varying(255)
);
    DROP TABLE public.scanlogs;
       public         heap    adelaide    false            �            1259    91781    scanlogs_log_id_seq    SEQUENCE     �   CREATE SEQUENCE public.scanlogs_log_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 *   DROP SEQUENCE public.scanlogs_log_id_seq;
       public          adelaide    false    205            �           0    0    scanlogs_log_id_seq    SEQUENCE OWNED BY     K   ALTER SEQUENCE public.scanlogs_log_id_seq OWNED BY public.scanlogs.log_id;
          public          adelaide    false    204            �            1259    91449    users    TABLE     �  CREATE TABLE public.users (
    user_id integer NOT NULL,
    role_id integer NOT NULL,
    username character varying(255) NOT NULL,
    surname character varying(255) NOT NULL,
    email character varying(255) NOT NULL,
    passwrd character varying(255),
    status boolean DEFAULT true,
    created_at timestamp with time zone DEFAULT now() NOT NULL,
    updated_at timestamp with time zone DEFAULT now() NOT NULL,
    images character varying
);
    DROP TABLE public.users;
       public         heap    adelaide    false            �            1259    91447    users_user_id_seq    SEQUENCE     �   CREATE SEQUENCE public.users_user_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 (   DROP SEQUENCE public.users_user_id_seq;
       public          adelaide    false    201            �           0    0    users_user_id_seq    SEQUENCE OWNED BY     G   ALTER SEQUENCE public.users_user_id_seq OWNED BY public.users.user_id;
          public          adelaide    false    200                       2604    91645    roles role_id    DEFAULT     n   ALTER TABLE ONLY public.roles ALTER COLUMN role_id SET DEFAULT nextval('public.roles_role_id_seq'::regclass);
 <   ALTER TABLE public.roles ALTER COLUMN role_id DROP DEFAULT;
       public          adelaide    false    203    202    203                       2604    91786    scanlogs log_id    DEFAULT     r   ALTER TABLE ONLY public.scanlogs ALTER COLUMN log_id SET DEFAULT nextval('public.scanlogs_log_id_seq'::regclass);
 >   ALTER TABLE public.scanlogs ALTER COLUMN log_id DROP DEFAULT;
       public          adelaide    false    205    204    205                        2604    91452    users user_id    DEFAULT     n   ALTER TABLE ONLY public.users ALTER COLUMN user_id SET DEFAULT nextval('public.users_user_id_seq'::regclass);
 <   ALTER TABLE public.users ALTER COLUMN user_id DROP DEFAULT;
       public          adelaide    false    200    201    201            �          0    91642    roles 
   TABLE DATA           L   COPY public.roles (role_id, user_roles, created_at, updated_at) FROM stdin;
    public          adelaide    false    203   �       �          0    91783    scanlogs 
   TABLE DATA           b   COPY public.scanlogs (log_id, user_id, scanned_at, temperature, symptoms, scanned_by) FROM stdin;
    public          adelaide    false    205   �       �          0    91449    users 
   TABLE DATA           |   COPY public.users (user_id, role_id, username, surname, email, passwrd, status, created_at, updated_at, images) FROM stdin;
    public          adelaide    false    201   4       �           0    0    roles_role_id_seq    SEQUENCE SET     ?   SELECT pg_catalog.setval('public.roles_role_id_seq', 3, true);
          public          adelaide    false    202            �           0    0    scanlogs_log_id_seq    SEQUENCE SET     B   SELECT pg_catalog.setval('public.scanlogs_log_id_seq', 10, true);
          public          adelaide    false    204            �           0    0    users_user_id_seq    SEQUENCE SET     @   SELECT pg_catalog.setval('public.users_user_id_seq', 32, true);
          public          adelaide    false    200                       2606    91649    roles roles_pkey 
   CONSTRAINT     S   ALTER TABLE ONLY public.roles
    ADD CONSTRAINT roles_pkey PRIMARY KEY (role_id);
 :   ALTER TABLE ONLY public.roles DROP CONSTRAINT roles_pkey;
       public            adelaide    false    203                       2606    91789    scanlogs scanlogs_pkey 
   CONSTRAINT     X   ALTER TABLE ONLY public.scanlogs
    ADD CONSTRAINT scanlogs_pkey PRIMARY KEY (log_id);
 @   ALTER TABLE ONLY public.scanlogs DROP CONSTRAINT scanlogs_pkey;
       public            adelaide    false    205            
           2606    91462    users users_email_key 
   CONSTRAINT     Q   ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_email_key UNIQUE (email);
 ?   ALTER TABLE ONLY public.users DROP CONSTRAINT users_email_key;
       public            adelaide    false    201                       2606    91460    users users_pkey 
   CONSTRAINT     S   ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_pkey PRIMARY KEY (user_id);
 :   ALTER TABLE ONLY public.users DROP CONSTRAINT users_pkey;
       public            adelaide    false    201                       2606    91790    scanlogs scanlogs_user_id_fkey    FK CONSTRAINT     �   ALTER TABLE ONLY public.scanlogs
    ADD CONSTRAINT scanlogs_user_id_fkey FOREIGN KEY (user_id) REFERENCES public.users(user_id);
 H   ALTER TABLE ONLY public.scanlogs DROP CONSTRAINT scanlogs_user_id_fkey;
       public          adelaide    false    201    2828    205            �   N   x�3�LL����4202�50�52T04�25�22�3���0�60�+�eę�[��_��J�!Ɯ�9�)�������� ]�+�      �   =   x�34��4202�50�5�P0��24�22�3�051�60�46�3�L����I�b�=... &E      �   �  x����r�:���)����]}[2	�\!��l�X�c~�#�!ÄL*'���$�����o��P���"���#�qƢBE|��Ŋ�SK�g�q��sϣ��-Vյ,�G؎r��{>�J���q�M�vO���^������/cj`��H`�Q9.À9���?��:g�0M�Y�h�Z��z})r�ˬbŗ�]Q� �j+����<�b.3�Kd2��ia���%��E��gyJ�Y�J0��5�5��UΓ��FY���$���0�a y��_�F�8�Db�:�	����z<C榺��^w.ۃ'�=!Z�-J��Q�2
DĶ�C��=ؘ���pVy�AU,���@� �Ջ�F7�3ػ L�3��(u����z��3h��֒�0"vc�!��bX��]����-M�~��x88o�y��{�I�<�iT��)qX�u�6�b�0*F�m���4�W^��11�S��R�"lh9�}Z�\f�11�mD	����<��E��\�(JV�{�5�Hr�_��e	�bC~��Jx�@���f�n<��� 6��N3��F��~����U���km���R0F!����{��������e��Sx��Ƽ͆mЦ.�w�&W�:���f�;#�?�}���ȓ�� �6}�����w�rl�s�Ы����Yƹi�5��ޟh\� �=\Rx"j�}��Գ�b�D�Y�|������b��z��T�И*Ζ�n��~EC����.6�\R$��BCzr>�5s��b���Oe��ҥr���S��t@�9P��$]�/��4�ݼ�����[S�wW�}��t�_iW�|��"6"��e.�r��%S��*�[a0Wa3��걊�R̊t~J��'��h4ڭ�#|hȸT���qg�TѠI�p�
����L#2�wٝ�o��ӹ^p%>���3���C�$&��;�A�V�,ϐ�     