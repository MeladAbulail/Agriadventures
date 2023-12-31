PGDMP  :                    {            Agri_Adventure    16.0    16.0 Z    8           0    0    ENCODING    ENCODING        SET client_encoding = 'UTF8';
                      false            9           0    0 
   STDSTRINGS 
   STDSTRINGS     (   SET standard_conforming_strings = 'on';
                      false            :           0    0 
   SEARCHPATH 
   SEARCHPATH     8   SELECT pg_catalog.set_config('search_path', '', false);
                      false            ;           1262    16452    Agri_Adventure    DATABASE     �   CREATE DATABASE "Agri_Adventure" WITH TEMPLATE = template0 ENCODING = 'UTF8' LOCALE_PROVIDER = libc LOCALE = 'English_United States.1252';
     DROP DATABASE "Agri_Adventure";
                Agri_Adventure_Ayoub    false            <           0    0    DATABASE "Agri_Adventure"    ACL     �   REVOKE CONNECT,TEMPORARY ON DATABASE "Agri_Adventure" FROM PUBLIC;
REVOKE ALL ON DATABASE "Agri_Adventure" FROM "Agri_Adventure_Ayoub";
GRANT ALL ON DATABASE "Agri_Adventure" TO "Agri_Adventure_Ayoub" WITH GRANT OPTION;
                   Agri_Adventure_Ayoub    false    4923            =           0    0    Agri_Adventure    DATABASE PROPERTIES     6   ALTER DATABASE "Agri_Adventure" CONNECTION LIMIT = 2;
                     Agri_Adventure_Ayoub    false            �            1259    111867    Carts    TABLE     �  CREATE TABLE public."Carts" (
    "cartId" integer NOT NULL,
    "userId" integer NOT NULL,
    "productId" integer NOT NULL,
    price character varying(255) NOT NULL,
    quantity integer NOT NULL,
    category character varying(255) NOT NULL,
    "productName" character varying(255) NOT NULL,
    "imageUrl" text NOT NULL,
    "isDeleted" boolean DEFAULT false NOT NULL,
    "createdAt" timestamp with time zone NOT NULL,
    "updatedAt" timestamp with time zone NOT NULL
);
    DROP TABLE public."Carts";
       public         heap    Agri_Adventure_Ayoub    false            �            1259    111873    Carts_cartId_seq    SEQUENCE     �   CREATE SEQUENCE public."Carts_cartId_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 )   DROP SEQUENCE public."Carts_cartId_seq";
       public          Agri_Adventure_Ayoub    false    215            >           0    0    Carts_cartId_seq    SEQUENCE OWNED BY     K   ALTER SEQUENCE public."Carts_cartId_seq" OWNED BY public."Carts"."cartId";
          public          Agri_Adventure_Ayoub    false    216            �            1259    111874 
   Contact_us    TABLE     �  CREATE TABLE public."Contact_us" (
    "contactUsId" integer NOT NULL,
    username character varying(255) NOT NULL,
    email character varying(255) NOT NULL,
    message text NOT NULL,
    "isDeleted" boolean DEFAULT false NOT NULL,
    readable boolean DEFAULT false NOT NULL,
    "createdAt" timestamp with time zone NOT NULL,
    "updatedAt" timestamp with time zone NOT NULL
);
     DROP TABLE public."Contact_us";
       public         heap    Agri_Adventure_Ayoub    false            �            1259    111881    Contact_us_contactUsId_seq    SEQUENCE     �   CREATE SEQUENCE public."Contact_us_contactUsId_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 3   DROP SEQUENCE public."Contact_us_contactUsId_seq";
       public          Agri_Adventure_Ayoub    false    217            ?           0    0    Contact_us_contactUsId_seq    SEQUENCE OWNED BY     _   ALTER SEQUENCE public."Contact_us_contactUsId_seq" OWNED BY public."Contact_us"."contactUsId";
          public          Agri_Adventure_Ayoub    false    218            �            1259    111882    FAQs    TABLE       CREATE TABLE public."FAQs" (
    "faqId" integer NOT NULL,
    question character varying(255) NOT NULL,
    answer text NOT NULL,
    "isDeleted" boolean DEFAULT false NOT NULL,
    "createdAt" timestamp with time zone NOT NULL,
    "updatedAt" timestamp with time zone NOT NULL
);
    DROP TABLE public."FAQs";
       public         heap    Agri_Adventure_Ayoub    false            �            1259    111888    FAQs_faqId_seq    SEQUENCE     �   CREATE SEQUENCE public."FAQs_faqId_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 '   DROP SEQUENCE public."FAQs_faqId_seq";
       public          Agri_Adventure_Ayoub    false    219            @           0    0    FAQs_faqId_seq    SEQUENCE OWNED BY     G   ALTER SEQUENCE public."FAQs_faqId_seq" OWNED BY public."FAQs"."faqId";
          public          Agri_Adventure_Ayoub    false    220            �            1259    111889    FavoritesLocations    TABLE     2  CREATE TABLE public."FavoritesLocations" (
    "favoritesLocationsId" integer NOT NULL,
    "userId" integer NOT NULL,
    "locationId" integer NOT NULL,
    "isDeleted" boolean DEFAULT false NOT NULL,
    "createdAt" timestamp with time zone NOT NULL,
    "updatedAt" timestamp with time zone NOT NULL
);
 (   DROP TABLE public."FavoritesLocations";
       public         heap    Agri_Adventure_Ayoub    false            �            1259    111893 +   FavoritesLocations_favoritesLocationsId_seq    SEQUENCE     �   CREATE SEQUENCE public."FavoritesLocations_favoritesLocationsId_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 D   DROP SEQUENCE public."FavoritesLocations_favoritesLocationsId_seq";
       public          Agri_Adventure_Ayoub    false    221            A           0    0 +   FavoritesLocations_favoritesLocationsId_seq    SEQUENCE OWNED BY     �   ALTER SEQUENCE public."FavoritesLocations_favoritesLocationsId_seq" OWNED BY public."FavoritesLocations"."favoritesLocationsId";
          public          Agri_Adventure_Ayoub    false    222            �            1259    111894    FavoritesProducts    TABLE     /  CREATE TABLE public."FavoritesProducts" (
    "favoritesProductsId" integer NOT NULL,
    "userId" integer NOT NULL,
    "productId" integer NOT NULL,
    "isDeleted" boolean DEFAULT false NOT NULL,
    "createdAt" timestamp with time zone NOT NULL,
    "updatedAt" timestamp with time zone NOT NULL
);
 '   DROP TABLE public."FavoritesProducts";
       public         heap    Agri_Adventure_Ayoub    false            �            1259    111898 )   FavoritesProducts_favoritesProductsId_seq    SEQUENCE     �   CREATE SEQUENCE public."FavoritesProducts_favoritesProductsId_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 B   DROP SEQUENCE public."FavoritesProducts_favoritesProductsId_seq";
       public          Agri_Adventure_Ayoub    false    223            B           0    0 )   FavoritesProducts_favoritesProductsId_seq    SEQUENCE OWNED BY     }   ALTER SEQUENCE public."FavoritesProducts_favoritesProductsId_seq" OWNED BY public."FavoritesProducts"."favoritesProductsId";
          public          Agri_Adventure_Ayoub    false    224            �            1259    111899 	   Locations    TABLE     *  CREATE TABLE public."Locations" (
    "locationId" integer NOT NULL,
    "locationName" character varying(255) NOT NULL,
    owner character varying(255) DEFAULT 'Public'::character varying NOT NULL,
    description text NOT NULL,
    location character varying(255) NOT NULL,
    "TheBeginningAndEndOfTheJourney" jsonb NOT NULL,
    workdays character varying(255) NOT NULL,
    "TicketPricePerPerson" integer,
    "numberOfResidents" integer DEFAULT 0,
    "totalStars" integer DEFAULT 0,
    phone integer,
    evaluation double precision,
    email character varying(255) NOT NULL,
    "isDeleted" boolean DEFAULT false NOT NULL,
    "ViewThePlace" boolean DEFAULT false NOT NULL,
    "imageUrl" text,
    "createdAt" timestamp with time zone NOT NULL,
    "updatedAt" timestamp with time zone NOT NULL
);
    DROP TABLE public."Locations";
       public         heap    Agri_Adventure_Ayoub    false            �            1259    111909    Locations_locationId_seq    SEQUENCE     �   CREATE SEQUENCE public."Locations_locationId_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 1   DROP SEQUENCE public."Locations_locationId_seq";
       public          Agri_Adventure_Ayoub    false    225            C           0    0    Locations_locationId_seq    SEQUENCE OWNED BY     [   ALTER SEQUENCE public."Locations_locationId_seq" OWNED BY public."Locations"."locationId";
          public          Agri_Adventure_Ayoub    false    226            �            1259    111910    Orders    TABLE     �  CREATE TABLE public."Orders" (
    "orderId" integer NOT NULL,
    "userId" integer NOT NULL,
    "totalPrice" double precision NOT NULL,
    "orderStatus" character varying(255) DEFAULT 'Pending'::character varying NOT NULL,
    cardholder character varying(255) NOT NULL,
    country character varying(255),
    state character varying(255),
    address character varying(255),
    email character varying(255) NOT NULL,
    phone character varying(255),
    "isDeleted" boolean DEFAULT false NOT NULL,
    "createdAt" timestamp with time zone NOT NULL,
    "updatedAt" timestamp with time zone NOT NULL,
    "ordersReceived" boolean DEFAULT false NOT NULL
);
    DROP TABLE public."Orders";
       public         heap    Agri_Adventure_Ayoub    false            �            1259    111918    Orders_orderId_seq    SEQUENCE     �   CREATE SEQUENCE public."Orders_orderId_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 +   DROP SEQUENCE public."Orders_orderId_seq";
       public          Agri_Adventure_Ayoub    false    227            D           0    0    Orders_orderId_seq    SEQUENCE OWNED BY     O   ALTER SEQUENCE public."Orders_orderId_seq" OWNED BY public."Orders"."orderId";
          public          Agri_Adventure_Ayoub    false    228            �            1259    111919    Products    TABLE     �  CREATE TABLE public."Products" (
    "productId" integer NOT NULL,
    "productName" character varying(255) NOT NULL,
    category character varying(255) NOT NULL,
    description character varying(255),
    price character varying(255) NOT NULL,
    "imageUrl" text NOT NULL,
    owner character varying(255) NOT NULL,
    "numberOfResidents" integer DEFAULT 0,
    "totalStars" integer DEFAULT 0,
    phone integer,
    evaluation double precision,
    email character varying(255) NOT NULL,
    "ViewTheProduct" boolean DEFAULT false NOT NULL,
    "isDeleted" boolean DEFAULT false NOT NULL,
    "createdAt" timestamp with time zone NOT NULL,
    "updatedAt" timestamp with time zone NOT NULL
);
    DROP TABLE public."Products";
       public         heap    Agri_Adventure_Ayoub    false            �            1259    111928    Products_productId_seq    SEQUENCE     �   CREATE SEQUENCE public."Products_productId_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 /   DROP SEQUENCE public."Products_productId_seq";
       public          Agri_Adventure_Ayoub    false    229            E           0    0    Products_productId_seq    SEQUENCE OWNED BY     W   ALTER SEQUENCE public."Products_productId_seq" OWNED BY public."Products"."productId";
          public          Agri_Adventure_Ayoub    false    230            �            1259    111929    Ratings_And_Reviews_Locations    TABLE     f  CREATE TABLE public."Ratings_And_Reviews_Locations" (
    "ratingsAndReviewsLocationsId" integer NOT NULL,
    "locationId" integer NOT NULL,
    "userId" integer NOT NULL,
    "locationName" character varying(255) NOT NULL,
    comment character varying(255),
    rating character varying(255),
    "imageUrl" text,
    "firstName" character varying(255) NOT NULL,
    "lastName" character varying(255) NOT NULL,
    "postDate" character varying(255) NOT NULL,
    "isDeleted" boolean DEFAULT false NOT NULL,
    "createdAt" timestamp with time zone NOT NULL,
    "updatedAt" timestamp with time zone NOT NULL
);
 3   DROP TABLE public."Ratings_And_Reviews_Locations";
       public         heap    Agri_Adventure_Ayoub    false            �            1259    111935 >   Ratings_And_Reviews_Locations_ratingsAndReviewsLocationsId_seq    SEQUENCE     �   CREATE SEQUENCE public."Ratings_And_Reviews_Locations_ratingsAndReviewsLocationsId_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 W   DROP SEQUENCE public."Ratings_And_Reviews_Locations_ratingsAndReviewsLocationsId_seq";
       public          Agri_Adventure_Ayoub    false    231            F           0    0 >   Ratings_And_Reviews_Locations_ratingsAndReviewsLocationsId_seq    SEQUENCE OWNED BY     �   ALTER SEQUENCE public."Ratings_And_Reviews_Locations_ratingsAndReviewsLocationsId_seq" OWNED BY public."Ratings_And_Reviews_Locations"."ratingsAndReviewsLocationsId";
          public          Agri_Adventure_Ayoub    false    232            �            1259    111936    Ratings_And_Reviews_Products    TABLE     a  CREATE TABLE public."Ratings_And_Reviews_Products" (
    "ratingsAndReviewsProductId" integer NOT NULL,
    "productId" integer NOT NULL,
    "userId" integer NOT NULL,
    "productName" character varying(255) NOT NULL,
    comment character varying(255),
    rating character varying(255),
    "imageUrl" text,
    "firstName" character varying(255) NOT NULL,
    "lastName" character varying(255) NOT NULL,
    "postDate" character varying(255) NOT NULL,
    "isDeleted" boolean DEFAULT false NOT NULL,
    "createdAt" timestamp with time zone NOT NULL,
    "updatedAt" timestamp with time zone NOT NULL
);
 2   DROP TABLE public."Ratings_And_Reviews_Products";
       public         heap    Agri_Adventure_Ayoub    false            �            1259    111942 ;   Ratings_And_Reviews_Products_ratingsAndReviewsProductId_seq    SEQUENCE     �   CREATE SEQUENCE public."Ratings_And_Reviews_Products_ratingsAndReviewsProductId_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 T   DROP SEQUENCE public."Ratings_And_Reviews_Products_ratingsAndReviewsProductId_seq";
       public          Agri_Adventure_Ayoub    false    233            G           0    0 ;   Ratings_And_Reviews_Products_ratingsAndReviewsProductId_seq    SEQUENCE OWNED BY     �   ALTER SEQUENCE public."Ratings_And_Reviews_Products_ratingsAndReviewsProductId_seq" OWNED BY public."Ratings_And_Reviews_Products"."ratingsAndReviewsProductId";
          public          Agri_Adventure_Ayoub    false    234            �            1259    111943    Reservations    TABLE     �  CREATE TABLE public."Reservations" (
    "reservationId" integer NOT NULL,
    "userId" integer NOT NULL,
    "locationId" integer NOT NULL,
    "numberOfVisitors" integer NOT NULL,
    "locationName" character varying(255) NOT NULL,
    price double precision NOT NULL,
    cardholder character varying(255) NOT NULL,
    country character varying(255),
    state character varying(255),
    address character varying(255),
    email character varying(255) NOT NULL,
    phone character varying(255) NOT NULL,
    "isDeleted" boolean DEFAULT false NOT NULL,
    "createdAt" timestamp with time zone NOT NULL,
    "updatedAt" timestamp with time zone NOT NULL,
    "completeOrIncomplete" boolean DEFAULT false NOT NULL
);
 "   DROP TABLE public."Reservations";
       public         heap    Agri_Adventure_Ayoub    false            �            1259    111950    Reservations_reservationId_seq    SEQUENCE     �   CREATE SEQUENCE public."Reservations_reservationId_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 7   DROP SEQUENCE public."Reservations_reservationId_seq";
       public          Agri_Adventure_Ayoub    false    235            H           0    0    Reservations_reservationId_seq    SEQUENCE OWNED BY     g   ALTER SEQUENCE public."Reservations_reservationId_seq" OWNED BY public."Reservations"."reservationId";
          public          Agri_Adventure_Ayoub    false    236            �            1259    111951    Users    TABLE     f  CREATE TABLE public."Users" (
    "userId" integer NOT NULL,
    "userRole" character varying(255) DEFAULT 'User'::character varying,
    "firstName" character varying(255) NOT NULL,
    "lastName" character varying(255) NOT NULL,
    email character varying(255) NOT NULL,
    password character varying(255) NOT NULL,
    gender character varying(255) DEFAULT 'Undefined'::character varying,
    "isDeleted" boolean DEFAULT false NOT NULL,
    "imageUrl" text,
    "isBanned" boolean DEFAULT false NOT NULL,
    "createdAt" timestamp with time zone NOT NULL,
    "updatedAt" timestamp with time zone NOT NULL
);
    DROP TABLE public."Users";
       public         heap    Agri_Adventure_Ayoub    false            �            1259    111960    Users_userId_seq    SEQUENCE     �   CREATE SEQUENCE public."Users_userId_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 )   DROP SEQUENCE public."Users_userId_seq";
       public          Agri_Adventure_Ayoub    false    237            I           0    0    Users_userId_seq    SEQUENCE OWNED BY     K   ALTER SEQUENCE public."Users_userId_seq" OWNED BY public."Users"."userId";
          public          Agri_Adventure_Ayoub    false    238            Q           2604    111961    Carts cartId    DEFAULT     r   ALTER TABLE ONLY public."Carts" ALTER COLUMN "cartId" SET DEFAULT nextval('public."Carts_cartId_seq"'::regclass);
 ?   ALTER TABLE public."Carts" ALTER COLUMN "cartId" DROP DEFAULT;
       public          Agri_Adventure_Ayoub    false    216    215            S           2604    111962    Contact_us contactUsId    DEFAULT     �   ALTER TABLE ONLY public."Contact_us" ALTER COLUMN "contactUsId" SET DEFAULT nextval('public."Contact_us_contactUsId_seq"'::regclass);
 I   ALTER TABLE public."Contact_us" ALTER COLUMN "contactUsId" DROP DEFAULT;
       public          Agri_Adventure_Ayoub    false    218    217            V           2604    111963 
   FAQs faqId    DEFAULT     n   ALTER TABLE ONLY public."FAQs" ALTER COLUMN "faqId" SET DEFAULT nextval('public."FAQs_faqId_seq"'::regclass);
 =   ALTER TABLE public."FAQs" ALTER COLUMN "faqId" DROP DEFAULT;
       public          Agri_Adventure_Ayoub    false    220    219            X           2604    111964 '   FavoritesLocations favoritesLocationsId    DEFAULT     �   ALTER TABLE ONLY public."FavoritesLocations" ALTER COLUMN "favoritesLocationsId" SET DEFAULT nextval('public."FavoritesLocations_favoritesLocationsId_seq"'::regclass);
 Z   ALTER TABLE public."FavoritesLocations" ALTER COLUMN "favoritesLocationsId" DROP DEFAULT;
       public          Agri_Adventure_Ayoub    false    222    221            Z           2604    111965 %   FavoritesProducts favoritesProductsId    DEFAULT     �   ALTER TABLE ONLY public."FavoritesProducts" ALTER COLUMN "favoritesProductsId" SET DEFAULT nextval('public."FavoritesProducts_favoritesProductsId_seq"'::regclass);
 X   ALTER TABLE public."FavoritesProducts" ALTER COLUMN "favoritesProductsId" DROP DEFAULT;
       public          Agri_Adventure_Ayoub    false    224    223            \           2604    111966    Locations locationId    DEFAULT     �   ALTER TABLE ONLY public."Locations" ALTER COLUMN "locationId" SET DEFAULT nextval('public."Locations_locationId_seq"'::regclass);
 G   ALTER TABLE public."Locations" ALTER COLUMN "locationId" DROP DEFAULT;
       public          Agri_Adventure_Ayoub    false    226    225            b           2604    111967    Orders orderId    DEFAULT     v   ALTER TABLE ONLY public."Orders" ALTER COLUMN "orderId" SET DEFAULT nextval('public."Orders_orderId_seq"'::regclass);
 A   ALTER TABLE public."Orders" ALTER COLUMN "orderId" DROP DEFAULT;
       public          Agri_Adventure_Ayoub    false    228    227            f           2604    111968    Products productId    DEFAULT     ~   ALTER TABLE ONLY public."Products" ALTER COLUMN "productId" SET DEFAULT nextval('public."Products_productId_seq"'::regclass);
 E   ALTER TABLE public."Products" ALTER COLUMN "productId" DROP DEFAULT;
       public          Agri_Adventure_Ayoub    false    230    229            k           2604    111969 :   Ratings_And_Reviews_Locations ratingsAndReviewsLocationsId    DEFAULT     �   ALTER TABLE ONLY public."Ratings_And_Reviews_Locations" ALTER COLUMN "ratingsAndReviewsLocationsId" SET DEFAULT nextval('public."Ratings_And_Reviews_Locations_ratingsAndReviewsLocationsId_seq"'::regclass);
 m   ALTER TABLE public."Ratings_And_Reviews_Locations" ALTER COLUMN "ratingsAndReviewsLocationsId" DROP DEFAULT;
       public          Agri_Adventure_Ayoub    false    232    231            m           2604    111970 7   Ratings_And_Reviews_Products ratingsAndReviewsProductId    DEFAULT     �   ALTER TABLE ONLY public."Ratings_And_Reviews_Products" ALTER COLUMN "ratingsAndReviewsProductId" SET DEFAULT nextval('public."Ratings_And_Reviews_Products_ratingsAndReviewsProductId_seq"'::regclass);
 j   ALTER TABLE public."Ratings_And_Reviews_Products" ALTER COLUMN "ratingsAndReviewsProductId" DROP DEFAULT;
       public          Agri_Adventure_Ayoub    false    234    233            o           2604    111971    Reservations reservationId    DEFAULT     �   ALTER TABLE ONLY public."Reservations" ALTER COLUMN "reservationId" SET DEFAULT nextval('public."Reservations_reservationId_seq"'::regclass);
 M   ALTER TABLE public."Reservations" ALTER COLUMN "reservationId" DROP DEFAULT;
       public          Agri_Adventure_Ayoub    false    236    235            r           2604    111972    Users userId    DEFAULT     r   ALTER TABLE ONLY public."Users" ALTER COLUMN "userId" SET DEFAULT nextval('public."Users_userId_seq"'::regclass);
 ?   ALTER TABLE public."Users" ALTER COLUMN "userId" DROP DEFAULT;
       public          Agri_Adventure_Ayoub    false    238    237                      0    111867    Carts 
   TABLE DATA           �   COPY public."Carts" ("cartId", "userId", "productId", price, quantity, category, "productName", "imageUrl", "isDeleted", "createdAt", "updatedAt") FROM stdin;
    public          Agri_Adventure_Ayoub    false    215   �                  0    111874 
   Contact_us 
   TABLE DATA           �   COPY public."Contact_us" ("contactUsId", username, email, message, "isDeleted", readable, "createdAt", "updatedAt") FROM stdin;
    public          Agri_Adventure_Ayoub    false    217   �       "          0    111882    FAQs 
   TABLE DATA           b   COPY public."FAQs" ("faqId", question, answer, "isDeleted", "createdAt", "updatedAt") FROM stdin;
    public          Agri_Adventure_Ayoub    false    219   ��       $          0    111889    FavoritesLocations 
   TABLE DATA           �   COPY public."FavoritesLocations" ("favoritesLocationsId", "userId", "locationId", "isDeleted", "createdAt", "updatedAt") FROM stdin;
    public          Agri_Adventure_Ayoub    false    221   l�       &          0    111894    FavoritesProducts 
   TABLE DATA           �   COPY public."FavoritesProducts" ("favoritesProductsId", "userId", "productId", "isDeleted", "createdAt", "updatedAt") FROM stdin;
    public          Agri_Adventure_Ayoub    false    223   ��       (          0    111899 	   Locations 
   TABLE DATA           %  COPY public."Locations" ("locationId", "locationName", owner, description, location, "TheBeginningAndEndOfTheJourney", workdays, "TicketPricePerPerson", "numberOfResidents", "totalStars", phone, evaluation, email, "isDeleted", "ViewThePlace", "imageUrl", "createdAt", "updatedAt") FROM stdin;
    public          Agri_Adventure_Ayoub    false    225   ��       *          0    111910    Orders 
   TABLE DATA           �   COPY public."Orders" ("orderId", "userId", "totalPrice", "orderStatus", cardholder, country, state, address, email, phone, "isDeleted", "createdAt", "updatedAt", "ordersReceived") FROM stdin;
    public          Agri_Adventure_Ayoub    false    227   �      ,          0    111919    Products 
   TABLE DATA           �   COPY public."Products" ("productId", "productName", category, description, price, "imageUrl", owner, "numberOfResidents", "totalStars", phone, evaluation, email, "ViewTheProduct", "isDeleted", "createdAt", "updatedAt") FROM stdin;
    public          Agri_Adventure_Ayoub    false    229   8      .          0    111929    Ratings_And_Reviews_Locations 
   TABLE DATA           �   COPY public."Ratings_And_Reviews_Locations" ("ratingsAndReviewsLocationsId", "locationId", "userId", "locationName", comment, rating, "imageUrl", "firstName", "lastName", "postDate", "isDeleted", "createdAt", "updatedAt") FROM stdin;
    public          Agri_Adventure_Ayoub    false    231   g6      0          0    111936    Ratings_And_Reviews_Products 
   TABLE DATA           �   COPY public."Ratings_And_Reviews_Products" ("ratingsAndReviewsProductId", "productId", "userId", "productName", comment, rating, "imageUrl", "firstName", "lastName", "postDate", "isDeleted", "createdAt", "updatedAt") FROM stdin;
    public          Agri_Adventure_Ayoub    false    233   �Z      2          0    111943    Reservations 
   TABLE DATA           �   COPY public."Reservations" ("reservationId", "userId", "locationId", "numberOfVisitors", "locationName", price, cardholder, country, state, address, email, phone, "isDeleted", "createdAt", "updatedAt", "completeOrIncomplete") FROM stdin;
    public          Agri_Adventure_Ayoub    false    235   �~      4          0    111951    Users 
   TABLE DATA           �   COPY public."Users" ("userId", "userRole", "firstName", "lastName", email, password, gender, "isDeleted", "imageUrl", "isBanned", "createdAt", "updatedAt") FROM stdin;
    public          Agri_Adventure_Ayoub    false    237   B�      J           0    0    Carts_cartId_seq    SEQUENCE SET     B   SELECT pg_catalog.setval('public."Carts_cartId_seq"', 127, true);
          public          Agri_Adventure_Ayoub    false    216            K           0    0    Contact_us_contactUsId_seq    SEQUENCE SET     K   SELECT pg_catalog.setval('public."Contact_us_contactUsId_seq"', 27, true);
          public          Agri_Adventure_Ayoub    false    218            L           0    0    FAQs_faqId_seq    SEQUENCE SET     ?   SELECT pg_catalog.setval('public."FAQs_faqId_seq"', 30, true);
          public          Agri_Adventure_Ayoub    false    220            M           0    0 +   FavoritesLocations_favoritesLocationsId_seq    SEQUENCE SET     \   SELECT pg_catalog.setval('public."FavoritesLocations_favoritesLocationsId_seq"', 54, true);
          public          Agri_Adventure_Ayoub    false    222            N           0    0 )   FavoritesProducts_favoritesProductsId_seq    SEQUENCE SET     Z   SELECT pg_catalog.setval('public."FavoritesProducts_favoritesProductsId_seq"', 17, true);
          public          Agri_Adventure_Ayoub    false    224            O           0    0    Locations_locationId_seq    SEQUENCE SET     I   SELECT pg_catalog.setval('public."Locations_locationId_seq"', 37, true);
          public          Agri_Adventure_Ayoub    false    226            P           0    0    Orders_orderId_seq    SEQUENCE SET     C   SELECT pg_catalog.setval('public."Orders_orderId_seq"', 12, true);
          public          Agri_Adventure_Ayoub    false    228            Q           0    0    Products_productId_seq    SEQUENCE SET     G   SELECT pg_catalog.setval('public."Products_productId_seq"', 33, true);
          public          Agri_Adventure_Ayoub    false    230            R           0    0 >   Ratings_And_Reviews_Locations_ratingsAndReviewsLocationsId_seq    SEQUENCE SET     p   SELECT pg_catalog.setval('public."Ratings_And_Reviews_Locations_ratingsAndReviewsLocationsId_seq"', 125, true);
          public          Agri_Adventure_Ayoub    false    232            S           0    0 ;   Ratings_And_Reviews_Products_ratingsAndReviewsProductId_seq    SEQUENCE SET     m   SELECT pg_catalog.setval('public."Ratings_And_Reviews_Products_ratingsAndReviewsProductId_seq"', 106, true);
          public          Agri_Adventure_Ayoub    false    234            T           0    0    Reservations_reservationId_seq    SEQUENCE SET     P   SELECT pg_catalog.setval('public."Reservations_reservationId_seq"', 106, true);
          public          Agri_Adventure_Ayoub    false    236            U           0    0    Users_userId_seq    SEQUENCE SET     A   SELECT pg_catalog.setval('public."Users_userId_seq"', 33, true);
          public          Agri_Adventure_Ayoub    false    238            x           2606    111974    Carts Carts_pkey 
   CONSTRAINT     X   ALTER TABLE ONLY public."Carts"
    ADD CONSTRAINT "Carts_pkey" PRIMARY KEY ("cartId");
 >   ALTER TABLE ONLY public."Carts" DROP CONSTRAINT "Carts_pkey";
       public            Agri_Adventure_Ayoub    false    215            z           2606    111976    Contact_us Contact_us_pkey 
   CONSTRAINT     g   ALTER TABLE ONLY public."Contact_us"
    ADD CONSTRAINT "Contact_us_pkey" PRIMARY KEY ("contactUsId");
 H   ALTER TABLE ONLY public."Contact_us" DROP CONSTRAINT "Contact_us_pkey";
       public            Agri_Adventure_Ayoub    false    217            |           2606    111978    FAQs FAQs_pkey 
   CONSTRAINT     U   ALTER TABLE ONLY public."FAQs"
    ADD CONSTRAINT "FAQs_pkey" PRIMARY KEY ("faqId");
 <   ALTER TABLE ONLY public."FAQs" DROP CONSTRAINT "FAQs_pkey";
       public            Agri_Adventure_Ayoub    false    219            ~           2606    111980 *   FavoritesLocations FavoritesLocations_pkey 
   CONSTRAINT     �   ALTER TABLE ONLY public."FavoritesLocations"
    ADD CONSTRAINT "FavoritesLocations_pkey" PRIMARY KEY ("favoritesLocationsId");
 X   ALTER TABLE ONLY public."FavoritesLocations" DROP CONSTRAINT "FavoritesLocations_pkey";
       public            Agri_Adventure_Ayoub    false    221            �           2606    111982 (   FavoritesProducts FavoritesProducts_pkey 
   CONSTRAINT     }   ALTER TABLE ONLY public."FavoritesProducts"
    ADD CONSTRAINT "FavoritesProducts_pkey" PRIMARY KEY ("favoritesProductsId");
 V   ALTER TABLE ONLY public."FavoritesProducts" DROP CONSTRAINT "FavoritesProducts_pkey";
       public            Agri_Adventure_Ayoub    false    223            �           2606    111984    Locations Locations_pkey 
   CONSTRAINT     d   ALTER TABLE ONLY public."Locations"
    ADD CONSTRAINT "Locations_pkey" PRIMARY KEY ("locationId");
 F   ALTER TABLE ONLY public."Locations" DROP CONSTRAINT "Locations_pkey";
       public            Agri_Adventure_Ayoub    false    225            �           2606    111986    Orders Orders_pkey 
   CONSTRAINT     [   ALTER TABLE ONLY public."Orders"
    ADD CONSTRAINT "Orders_pkey" PRIMARY KEY ("orderId");
 @   ALTER TABLE ONLY public."Orders" DROP CONSTRAINT "Orders_pkey";
       public            Agri_Adventure_Ayoub    false    227            �           2606    111988    Products Products_pkey 
   CONSTRAINT     a   ALTER TABLE ONLY public."Products"
    ADD CONSTRAINT "Products_pkey" PRIMARY KEY ("productId");
 D   ALTER TABLE ONLY public."Products" DROP CONSTRAINT "Products_pkey";
       public            Agri_Adventure_Ayoub    false    229            �           2606    111990 @   Ratings_And_Reviews_Locations Ratings_And_Reviews_Locations_pkey 
   CONSTRAINT     �   ALTER TABLE ONLY public."Ratings_And_Reviews_Locations"
    ADD CONSTRAINT "Ratings_And_Reviews_Locations_pkey" PRIMARY KEY ("ratingsAndReviewsLocationsId");
 n   ALTER TABLE ONLY public."Ratings_And_Reviews_Locations" DROP CONSTRAINT "Ratings_And_Reviews_Locations_pkey";
       public            Agri_Adventure_Ayoub    false    231            �           2606    111992 >   Ratings_And_Reviews_Products Ratings_And_Reviews_Products_pkey 
   CONSTRAINT     �   ALTER TABLE ONLY public."Ratings_And_Reviews_Products"
    ADD CONSTRAINT "Ratings_And_Reviews_Products_pkey" PRIMARY KEY ("ratingsAndReviewsProductId");
 l   ALTER TABLE ONLY public."Ratings_And_Reviews_Products" DROP CONSTRAINT "Ratings_And_Reviews_Products_pkey";
       public            Agri_Adventure_Ayoub    false    233            �           2606    111994    Reservations Reservations_pkey 
   CONSTRAINT     m   ALTER TABLE ONLY public."Reservations"
    ADD CONSTRAINT "Reservations_pkey" PRIMARY KEY ("reservationId");
 L   ALTER TABLE ONLY public."Reservations" DROP CONSTRAINT "Reservations_pkey";
       public            Agri_Adventure_Ayoub    false    235            �           2606    111996    Users Users_pkey 
   CONSTRAINT     X   ALTER TABLE ONLY public."Users"
    ADD CONSTRAINT "Users_pkey" PRIMARY KEY ("userId");
 >   ALTER TABLE ONLY public."Users" DROP CONSTRAINT "Users_pkey";
       public            Agri_Adventure_Ayoub    false    237                  x���Is�\��;�?E&z��oR���$z�@PgB/�	>�a�O��N�$�����bgɒ,.��w�ka_�/�� ����_x�+��6eT����܆�������7^='u��פ�sP���%]�_/�֟��D���5M����#�r���?��B����Y����˳0A��1��q�E��G�3�iՇ�(�������?��礏�)"/�zy���4�3��&Q� )
����&�~�3G���3�X�,��.�h>'>���9:<��Av�w�e�~5�Qd}����gF(ݾ�VǠ	�S��`��J��������rO�sމN8�S\�1RJ�swW��`�l�/>�t�q���u�-���Z�]:��;̹�f����X�ug�A���LE���(=��W�}}:����,��^O��;�Rt��\���V#z���-B��u��k�h���fT+r�;K�i��4Y�$;�.��(��i1��:�؆�M��fi�W�c�q��%��g��r�/�B�����+�|C�o8�������^"���3�.<�+���g�^�ἴ������}��"�U(~����g�슼�E|m����:��.����tv��a�Qㅻh8��ÿ��)�B	3"SxeB�X���9�M�i�z)����\.���/(���|8b͡=)���������%�:u�N�����Ł��l�ug�O{�D�����,��T��(w.Z\��\�@��p��0#I���e�h���R-MJ���<��R��
��Pb�+�O��S��Nȸ]�c^㾡�{N�it��o��Qe/<N�.)�y}�<a"'���+�����|�.$�4�Ŝ������N?�0���7x]����"�~��1� �ՍEa�žE�����_j��4�n>���1��?:0|ėߣ����@�ȯ#�S�[GUn]��tD�󏸴:�vu�ײ1�qcM'�0�R�!��]QمcU��z���R�r�M�u���<U�~W��f�SX��%ʄ+�?i�!�(�6�}����>s9��ݱ�N�%YF%
���$�jVN&)�(]{��P
&?�S���0=��e0��H�wn������p������������x�Kz��+3�y}�����|e5�PC�:��~v8�H);��@��Ў�X�A�Jڵ-	��H��>��{&�HB ��������U�nH�t�����]�D�׿���~&�e]�֭�z�F���A'�rd�c�6��gYə6TW����B�S�a�r+\�6�j���yZ��S��&��V�0��h��SF˴�|�hl}��,��}��;V���[*����!֧8ƁP�Fb��އ~4�����Fb�ܬ���Y��v}#��N�Xk����rX�<x1����6k�G�bӧe�Bg�|�<�>��8���H5��|�I�p���ACH(�tG՝��MEW��.���8Wa<��}�%�
��t������h	��.��+o;�/���'`��3�`^N���
&�����d��K����\ϑ�(�ɜ�. �2�؍��l?��2����s �K���#������c|��� 2�\�j�c*dZA�u�3�8X�#��9�G$��ҿ
�k0�*�!��{�Ȫ(&H/���l%m��; �����?3;uL���<Jr�r��@�[��S<�^��3�R�q닧d�3�ԺX�\��~Mp��-��k���v�9� ��P%߇�u�����h|w�p	�*���'z��dJg����qwV�3��˖�N�v;4�,{��� g)�J�˷� �=B��5x�$l��G����q7C�}5G���OMe.L[8�h�t&ڪT#\.�|�C��s�s��-G�f�0jrК�x�dV�n�r�$F�>�{�ώ�:�^��D��5RnIl���8̎����c?��7�N��Qf3pM�ɷ�����b�����U~Lݓ������޹��p-=�wa��� ��D�ø.n2�ZA�����tg�C,�3Lo��ȮѪHݮg���%�����)�0ηV�0���Z_� =L��xTDё��]�I먇�� ��}��������-�d���.b��~��z��}����0�G� ���-���@r���a�_��$ץ��f=���
�^o���M��3��8�&���A�R[2�%3�)���q��W݇����P��?#/I6bG��w�����_5/�e��D�3IT�c	���q��_�[I�u��5�u���x$����a�9f8�~*�O�����qF�ne;S:tK��qQ��e��Я.��&�Y�ɤ�k�1�k��E3�,�R
'��K�!]�s�
�[\�7O�U�I��]���s˹�����ޏXH>�0�B�	�/�~P�]O�r����Sy'y�s(���7A�@_�lhnhm"�&ƌe��v�yI��J�+�@Hr�;���s��A��i2c띻�db���1�YAd�G�����ʓ�9������?,��\��(���K�"mI��d��$�
#���	ҚM9ܔ�ߢ�D��u#�G��Kd	*?[h����+�|%�Zi�H�Kh	�+����%{��>���}��l�Z����̨��xGuӃ�SF��)$���60�tX)��*@PU!�1(�<���s�m�y�P�rԓ %��
�\��1� c}D���s��|;�ъ:�-�B�|�v�>�VJ�v�W� V�ȲP'�|��3-����+�v`!��5s�Ǻ�\�?K����p�OX�G���
h�h���ˁ�&ɩ�uR�r2`�E��ɠWo̟-*�w�m��Vܱ(*�m$!k�|`�����.����U�ؕ�WV.'��j0w5�穘F���s�L�"�uw���@r�Iv�O�\�Q��l�h80�¹ŗ[|����+��k�� _�%�I}A�����~O������~-��g��&�R�v�
�8-�ꑣ�&��H��䩥-����!)}M��@!�#����oI�,�C_�P�?�va`%uJ���?���*���(�.RmW�Ǖ5~xCj;���-Ǯg�:�I��y��/�'���*]�t��F�F�dC���c)�r��Ó�Tk�$����=�kY`�h��eZc%I��b	<��m�ק���!c��]�6o��R�	i�c��C�'���WA�������"��r�ڼpW���b!�5"�4��s �'�x�UG��QA&nؙ����=c���^�V<WS���2�[�7����3����,6��\�����wjRh�-{���㘇�`�2�����J�]�n�#CEN��-����]���)�2HC�]�E!EwY�\/<�uZ��*J�ń�>���2M7�BF��C5��M�ɑh�:��-'���>��JJ��D+&��}D4H����(�L�����e�����T��~m|G�G$ё\�uBWی�3ƫ$�Y��ǲ����Yy	;=:�%&(W�0;�5Z�ڄA�k�]�]�S��t�P��oz��S&sp����!P;?���<I����<�*�V��J�����J&���?����� �B�;�4���7���3�"�l8���Xެ���C\���SAxW����㞧��R_����S&5S4�ԅwJxMPu�T�YvQ�+�ぐ���3bF:�$ǚ��9�ڑݵ� ����fb8�n��AP�(��c��p������{�w1��{�)���b^i�]b
e��g�Ț�s��[�<�S�|���R%R��2`��8smAi�g�8��$
�	w;-�줴���I��]���=Ge�q�٪�YٌX�z�y��(Y�V�}��{V����屾�hbIE��FS��?���#�|K�J0�5jl�ݨA~��o��o�\�`�a/=O(�o%����[J�߹��7Ţ��|u�0�rk ��~u�+��D������W��q�y6��7�<�dR��c�����|%s�y6����<�p���F�Η�:B�pn:Ϧ�|���H����_@����
��l:�o�y^�D�g��q���=��	=��󛅞�    �����Pd�г	=�G�y%yƈ���R�D!@�&�lB�oz^�ğ!�M�_X���Э|��/Q�2�7h�7}F��Ҟ�-=��V$ڊD\$z'�A��3�.<�/��q܌�7��������'(;[+�֊��[1�G��..�XyB�/�ֈ�5b|T#�;T����N��s�	%V.75gSs~���>��C"_��Pr%r�k���w�5�@�}߉_yB�/��1�u}\��{\"��f �KO(�r�i�����{|~�����nn
�0~�����3A���_z�^v��������{��G#�#?��ߗ������woz�����`�B���I�.=aЊ��¶������(���0q�}�n{�@�F���[D�.�4���eS���v��s�7��S�E�A'��}��~,���鱟݋^S�e"*�f;}�܀
�6쑌	6�R�G����``�٭sg����ܑ�g��5�~"��8��ߎaZ=�0��r*�RG�����X�M�	�x;���D��紷�*�O�j<K;{,qe��|d�wl�l�1ͣ������\�<��n��.Š�b\Q,���\�hQ��T�ӘR�����F�#>��]�elMTϤ�(�n�$ލ�/�FL�Q\.ڵ�Qݫ��]ǎ�eE߻ �9k���ÿ��J�;�#@wL��N���[��q�I�҈<#�;�+��J#	hĿP�0�z�#�C4�Sk������u��<���3��3��2[3Wؗ5_�����/�1xaX�p�3�	s���2�P2t��+=Y�6���Dv@���n�Y�w@!U	�l��&��1p�E������Q���5r0�^?~���9��֡�}��g��A�#';K�dv���]��Ժ�$tH���?�={P�`��dy�(+�8)����|qK=7澙uvP��u3��f���ҋ��q:��=�E�2�����rV#x�5�6���wX
�k4�9�;��<$���Ѥ�wz6���2�Q ����"�����z�t�Ŝ~��b9h�86=���������<��:_��@%}�ˆޖ@vq ѹ����,f��2o�%��i��<����n��u����>�pW�1�P>r�UA� �rsn'v��[���-چ��!2�y�PD����#���0�Mz6�m���������Ĺ@Dz�ݟǎ-���biI�\� �IH[fY�>":<"�Ꮝ[�+����4�>��w��{����xVn���O0�2��v���'��&�L��b���zv|~��c�Y�骚�鵉St���}'���|���!�v�3�������/2�j>WT�/�;�V^ߧc�a)��:�y�����#�-�ˎ�p���x6��x/oQ���C��j�0ќ��<�nv_j�D�q��sE��?�����}k�Џ,���`�f5X��mi|���Ygں��ƍ��d`ч�?�Dqt� a#dZ�S6������ᅧ��c�^.����Ak:��<~X@w�Ns	,Y}����?ˉ�{i��0�^dT倳�K�N���W�^C}�+���|������7��2�k����9�m�i��|���T6�e�Z�� $z��=}���7-WNԫ@Şɟx�WPq�J����r�,^���U\��|~�$t �� �Ƀ����Ci�`MD��0T�Q��Q�؊V����I�/��;va]8&ÜO���������]�G�@�ys\�C�\�+�׺����0<�� ?����k����G�mb���AB.�!�C�,�ꖅ���~����%�et�6B��8����'��L�4�ǂPnY�������}fvޣ��ȇ��*����<��Q/J�S�vN�;T��9���k�Q�I�ਰ��;�L� ���4�ds�4�#�),L�x���E~���g�퉾��2K�ÀM����ߢѱ�����H�~jA�U'&T��(Yw*�00%��|oq	0�$��Ĕ@�~P~�̫L\FE,�/�Y���z���{���=!�"�	�}�U��bw����o��4�ۓpzl� �y�bu�jD�5�H�rx�^�&�������ޝ��TC%�;e�]S®��%pq� �<���!�h^J���d��:t�|����6�u�:�̀*V�HS�+ߔGayn�vzO�����rgz�G�AL����.Z0^Ȫ"��,�!z�x��OV��[��v-q��hr�O��V��x�t��s��o���2}��N
�=}�/,_k�`�F� �%�߉��릨>���>��îd�Sd���
B�������#r&��������84�=	wPC�I9 nVӫ�`�e�K��Č��4׽�]���� ݲ�
����C_vt�ٔ��sY��J�;c��fw�#�v��q)��Mм�+��Y��ݫ��ӎtj��(�H�R6ׇ�A��b���-4<���urݥ9ќHGg1���V��ɵ6>!Ҁ���#��e���G`�b��5QN�.�CN�\q$U-a*�*?�29�\��>U���:��5��fF�5Nu���Ϝ=��?��_�s}��a�&�߰ݰ�0l��}��[�g{?�s�	�6eiS�>RYz�L��xov��KO8�)K���ѭK 9�$�w�.=�Ħ,m�҇*K�I>�W�}4�/=�fIĚ���Rڷ�i��+�E�/V��OU�4i�:$vn&$E;��'O�v'j�=�&�L-g3ꃼ01�s�$@����v
�H�������g'�ƃ��ղ��\8(�x����-��TP��3>�(���$�*���W=(x��!�������W�v�l�s����N��Aj��(VG��l/���n�u e8��99�~��7/����ěH=�Y��4�&�K�@U ]�:��p�	�?1@��ݙC)N'*&���` �gt&wN��:irT��DRF�`��g���!Ԙy�N�L�Sް���'��4�M��ݚ�{v�z���5�?��pj�<7��7j��J?��;{�}�	�7�s�<?V�|�Mz�ߏE��<@��W�p#�.�����Q��V�S�㎚bK1��؏�>�\̈́G���K�Q�c����7�_:jy�k��x��`�.�Y&"��1��t}ί=�Z���y����xˣ�[G�*],�9�B[ݭ����V�'-��P��>o2�l�H�%Z��
����<��s�l�9����j,��v2?3Iu��M"���Si�ek�=��|d���Zw��5B��>,xG6͙���ܹ;�H�]���S�=��Pt��&3�v����P=erAB���w�������%C	��,&N��;�j��'6Ǟ)����?�� ~"�jF�:{�+���Ի7D��?U-���ԯL��jV���M�"�ӽ�%�у����.�i��";ZP6���!'���\"r�K��P�S��垠�b��Fw���S�	�0+2��IEn��T,�&�G��ۏ{J��ǥ��H\��<������h�(�R�4���v��6��r�U����%�JƼ@��i̥�,�l.h,E������h��
����*J�ʡ���P�G���{C����lJV�X�{V��di�S���ںZ�>� ����:�~`e榶�?�xƐ���?���oM$��D�5�|H����z{.:��?X"��X� �el�Ѧ���$��J �?�ԛ,i]����3���,v����M?��ɤW�g�z�����53" ��~��G�i2�͕���~���k*D4�*�V���ɤWZ�=��/Z_F<a (����z)�1�>"�Z�OO��nqH$,���L	*8��X�N��I��U�X�k�Kr�����jF��.����C����0�����}S���w��B���h)邝�۳@�i8	ʸ�9�Rrv�jh�<+��~M��pw	��:%&/�R�x���t>%����b�PZ���cZnC\��qTH����2�Pl���ơ,����4o�*�thG?��/P���ɒ����`�;�t�Q����f�;�?��    �Oa��5�3�;��nxX�qN.JyR�Z���������W=�����si~��������K��3�b��� �S��щ�o�ù�L�r�d��u�g?�3L�T��\�"9Do�Z3��Stg��(O��M����up�Pid���$C�qI��6����͋�E��]�NZW&靫��/֯bê��Y?�k��fݞE�.�,���A����}�HO>(C�G�SNѤ-��T�� L�Я)�����"F�^�[�G���c;(����jz2�g����H"�V>�O����x��5S�8ۧ�{�w2��C��JZ`+o�"���X=i�v�!�?ǒ~۸�ϥ'�}�K����/h�u��3F�����ͿPKj7-~��?e���S��������O��i����_؄WWN�؆���$��Ə7��7���	����N/����W<�^��W����G*������"�ԭWd��M�"?Co�b�ԗGH����[���2�E�&���D�ϥ'�n=$[��A~�^��;��ߗ�Hp���C���|��+r����1�}�$ �[��C�f�_�C���#I�\z"I���C���|ޤ�+� ��A��}鉤 �����K�2��J#���? ���IP7uiS�~פ�+��3�����KO���M^���I�$�w����D����M^���E~ő~ƈ��ߗ�(���K���)��/4b�����ϥ'
���`_~�㛝�4~�qe��n`�w<j�4;��(!X>�;�>��r�Ӂ+�t���b`���D��v� �ȱ�[��
g�U#ֶ���X&�o$:-'�פ��]����"H�P��V��u$����UC�u����S�4w/���g4�ُ�H]'��~�bM��t.�f��+��ѥ��g�OR3j*��ÎK@��c\<�W��A!�v2a[`�X�rj�s�{��@����Q�A�����-�F���`o�	NE�.�i{�@"2�%OJ�jg}i�1���� Q�cUMx�>��mJG���Cw0�N�G��`�E�� ,8 ��y�5L�0ˊ|j5ׄ�d��łK&�Y9wYf(���d��h���a�Jm��Q�b�D��ix���ʣ22�4PҦ�}�*�X��CG�/*K?���*����"��1��x�u��W �>�QךvsB�(�k��C�t��B�����9W\��{�ix���\�U�2����� һ�|�+���nK���ɍ�V���9�tQ]	/�5�qr-yj����2S#��"�m�m34p�xi"�\05P�r�x��5���c���b�8z;�|�$��;).����nW�h��V
~G���xO� �m�m����=8�g���w6_s}
����m#w2r���3��Ә����Xnw���ܽ%�� ���|͒P %�����(ʿ:u2v���O�������9HT���vg��%��֌J��vU�)��%{,��7O�Έw��*�ςK�:��Z����bI
-C��9�<F;���׭��=Nq�z��-J�c9C�h�ݐCe_�$��>�{����J28���#�=��̤G����-Ue�.�<�פ��(�C�A1D%'gWQ�Y��Ӯ=�h����2�K*iN����{>)��e��M�=<���JԨ�#G<=���� ,5�|�N�L�k%��#�����_$�:3Ԁ��"M��l6_:H�(�~!�M(�u]=|�3��N;?��T?�ٝjJA�c��1ٌS��\P�a��B����V�� ano��EeVZV��mrg�"*�`��G�@��8ګ��?�r�;��yܠ�G���`SKt$���H���Y鹳��ϧ��y��A|�����%3\��ꁌ�	'Ƽ�z�W�_Lw��	���Ɠ�$���$l.D�^�㋀���4 ]Bڋ M�AD	�)ߏ���1�_�\w�"$( ���D(v>�5�3P���!�V��/�C��v��D�R�v��0ZSM��.Z/��ڙ����u�9}i*�!��(�6}����^dzc,�,�"��8q���;bjN8]p�>�:�(3�a�Ө����+,=�$$���H��b��q�r�N.U���\�]{ͥ$B�Uu��!^d@Ÿc���?�żK�`ʹ�+A٥D'e�òJT���V��l�v�X���BN=�J g��F��8���X͒���e}��CUww�+��HN�e�D-@u
�j�:�G����0���Qz�ti��a*/��-���a<7gE'Zb��R�[|F�*Y�C��{n�����6��WD�Xak��f�5�6*Uw�����^�	�0��^]������SZ�)�W�u���C|���Tq���+~�	��?q�+N#��'��G/V�jA�.������ܮ&��1"���A@��`�
���q����>^$�k�r/�m%і*f~|*,n�ĻH���RYS�����{�KX���Ϯ��&��e��#-�XÔ��z���e��q�z�}pP���x}"�[�����YVg&f7!��f���0=���t{O�� �������I�G�Fv����#��h�u����kt����{VW)��~�gxoǽ�k��G�����_UP�D��'Ɵq�'�З>f��ocR�I+/�}���TI):����z@���qi+�k4Y^��Â��8��Xp�=�����Dj�Zk�����t��)LQdr!�d���C�vg�����;&(��bq�/�0%����I�����!h��_9O��c�)!���ǭ	�"���x'��#i�Av)p�J83�K�W�M������vDa�F��Q��A���ð�V:���c��F�P��+�`Q1p������:7J�d�-p�	�c�y�Y�ZT0"�`jqY$�p9�לDB��\��}�Į��/�o
�C�U�?�N�3�I<�?�����T	E�`�%�.��h&�¯��l~-�触O�#:@�(슜���r�t���j/�"���[s	��2_"�d�;�&�C0����c;�D���~���8�g?�M��1X���>`��|�SA�&�����,�~9]DĻ�渋YζO��D��0ϔ��qd9i�4�ᘽGa�6ϻH��{�!���î��~��=/��5�t�-4��G��2y�O¥|P/�S����`vG�A��|�QJ����V|$p~U{W�nlU5,�*�.(KOE���q�!a��7��I�YM�G��x�z��IZ�i=���U�3����H��꾹}d,�~j�e����d�O9qa��������:��
z	����8�X�FS9r�(��X<)#p��Ґ�Rצ0��;��*�����E��li�.^z�GX^d��t�¤YA�|�a�EG�8�3Ky�׳wd���� %	��|���hXa�i�
�З��Ў/ڮ1���8�+��X�Ӛ�W�FJ�Г\�T�D@�;H�!	�ENm���xX_]�T=M%]�,m�� �n�̖��EX���{������<�Ԓ�L�9���f��O�z�ȷ�0�E�Ke��_�"۪P[꣫P�mL�&Mowx���M� ����2��)C�*�L�o��.=���[���������#$O����M��=mmO����=V�g~�Z�ϥ'B^p���[��7���AG�I����ϥU��U��J��W��c}�ߖ����2��0����Z�����{�����si�$�U��j�o���G+����G�.���T����V������%�a����ϥX�@mU��J���y�7���1��.<�v.'��V��
U[�����^q��ѷ����+��+���6��M���	�W<�g{s���x��:�0��6�����!�0a�!�����n�/`nczۘއ��}�����RI�Q�"_��:����;����W�G��z����"��H}Ƥ��T��)�ύ�>�R7�?eV���c�؏�QB_Q��������y\�Q�z�#�_���O`'}x�7���}� �  ����0�/Y�&�o"�����
6��aTJ�T�^�M��D�Ϝ�{�|o�O`�����9}�T�H�n�?��OM��bSXɵ�9�{q�Rh�-{����1!�Z��H����.o7ޑ�"��z�ji�"ݫR�5Qi�k��#��.K�녇�N�^E���C��p�Gy?V���fXȀ���\���z��H4��-'���>����\��D+&��}D4H���.qQ�07LU3���h-W���N-����؏H�#���4���wg�WI�	����e5aw/>��vzt�YKLP�avk����"�5t����{uq8�/k �!���ۀ��ԟ��I}P/��P+޷� %W����R�+CQ0����Q
�����]]#���UN��W�iZo���+�V�5��׎�z��IqU:;�˰ƨ���]4���_��d���)	�2!p,N�,�M�i0��'�xV'��r��~A�}~��k�I��H^^v�~LA_"!i�S'�k~\Xj��p8+H~�c$�_`�%�gi��j�G�s��:�����KT��aH�p�Ԙ,G�d��jiR�H�q��:�V�D�c]�}�%���8vB���`��U�s���N���'}�&U���D�"�P�2��g��}UrC>V��]��b~�嵐�[��l���[G�Bt͍�u�}����~��v��6��`�w|��G���r�{4����`��u�y
z��]���T:���G\Z�e�:�k٘⸱��Z�Q)��䮨�±*GP��[�|���A$�3b�'����ʡvS ~:�e�Z�L����&�Q�n����h�3��.���T�Z+��[VN5+'��w��=�j(��)d�����2�x��;	���ߏylt8��{�v[ܭA����hC�56��xo��)}���;�j�����֙�������c,ԛ	�H��Ԭ�]ے�Ϙ$�!�I�{͋��&~�V��h����gr����ϔbu�|�k��������������t�� 3D���^����t��Z�& N5v��+A��+/Ģ�K �=��y'Rd8�Oqe��t4>wwŮV�����SANg���YW�ҪI���ѥSy�Ü;�mf�
�쁕Xw&�X��T���bс����tj�P*���S�>�h�&naۭF��.eZ��몳'��m=��h�ͨV�w��Ӑ�i��Iv>]:��/Pp3�b�m��� �]�~?��Y<Q2���w"ʿqI ��\R�0F����e+��Vn��Cm%�<��:+��
A�`��[�UzG��Xn��K}��uß`��$�G`��-����fKo~mz���E��<bh�����ᯁ�;i��!���1䏸����-n���;x����g�%́��7���0қa��4������;������������<�          �  x��Yˎ�6]S_����a���&�h'M3@�n
tC[��BI3q�����%۔	��� 9$-���s����rA�E�(Rc���~#?���$[�9�YK٨�~E�~�S�䆊"1�')ZT~��V�X�L*�Z�Y�j�Ѧl��s�
�K�Q0z�%mR	��jdm��r���.�&5Kj��E˪*u����]���T�L�US�&k��'~p��[?��d�� f1��'�<>!���]*2�&vؓ��q/���1[7�ife��_��	��hTi�9��}Q�a+Wm��re�v���U"���Y���Y�L,3i^�j�*�d�Q�M�RQתnFp�|�����n��r�Eлe{{/,m^�6�1P��v>��Ū�DQ��g�gj�0�{)�,�q�=��H�R��Z��rY$p��9^��C�`?҉P��LX�cB�!���C����֊�c4���Gu<�	���`�� C`�Y����6�d`{*�*�e���r鱅�d�Fa
瞈���.x̦w"��xD~����r)jE4t�J�v���i-jP�h-7F)V%��#a������p[����t�L
]t@����0*-V�ZɎHY]�"�����+�)\���ȉ�n��1�A�eNRh����$�=�%A�?��
�Ck G��.�!+I ebzuV�"|XG/��8â��	�n��S���u/�TN6؆4�Si�,9�F�ʭG]`٘�-�v��E�9J�sv��=���ɞ���g�GQ�mj�����L�l_��B��F��͡� <�d�=���c(���%�4��y���`��s�N 10f�D$���>�s����3����؃˲��
|.4��	�Ih��Y�kQ���P�;hv��k�-���������;М*�{A)��`�Fi7����*6�5��;&�T�5;y,خ��[m�,�xA�����D'^L �G.tC����+���K���
�s�����5��M�N��#���L�����U	���}*�`ɘ�ccf�y�"= �ɼ~��A��eC������`� �m�+���	,^D�pWny~�Sx�f�8�9��C��#���5]L �sW�y~L�ߒ��hUa;b���)Ę����4sȥn��L����4��)ɰ�����eb:]{M��f�7K����/�)�K�C^ �U��8k�����3dH���f�D!-d��>Y��fSҌՄ�k���êb�n�/&��("	a�DS�5ͦ��̦d6V+�G������3�b!�.�iӥ��E |�B�!0pȋ�꾭���+Uj;N��1T�ln�R3���m��Kl�;�)����uo?�=�w1�"`L� S�q{gj��2��Y�W�����W�+=�w���P�P�-J� ��J~8�9ܢG��Ȗ��]6W�.���y�S5��q�`�`(�͞]["˰ZUË���>�4��� ���MH�^z`F!K�ӵY���]�n*�
�v������xm����J�	@`^w2��|��{9���&��\!Y��w�9Gxv�?�3���#�u�`Nը�93�UW�TT�Q�3��`L��w �E��m�Ͱw.��%{hi���{W��K���P�G�	#6�G�	C{�!w`T���Dе&�f�
Y=��Zc]h�$�����97�Á�]��dJ'����id�"Xw���[n˗��k%�*"���W�/H9��б��"���Ƹѿ��ymx��      "   e	  x��Yˎ�8][_�]/�"X�eo
��b����t��lh���%�jR��|��KJ2�bU�@$E��uι�t�Ouc9o�vR�qv�f��5S��y_u���Z��hr��C�v��FV����u�V��d�������esa�n:Q��H��8ىxu^��4�����-[o�YzL��s���:�`)�V�j:O�oQ�9�jp�V���ag\3/eUh�#���'�w��	�
�0u>��qY)-����cܴ"�,��0�^��>gi�[o�>OK�f�����Z��qD�խ���)�t���_ÿ�+���&�n�L��"&OL6y�t׳�e��\�Et�TQ|�����o����v���mW�QPW��+mX���F�8aJ�5"/E�ء��ZնL�'�����NT�����_m��j[����ݝ�r�����T�+�s�	�2�+����}зi)�y�x��¶	�}E�Pm�.t�l�6ݬ��F�*Q\��n?0̔�j�y)Qa�����)w��y'sJ32F�3���Ӱ�avL6q�&?��h��b740�j�Oi!�)����Pv�����f�7c;�v�r�	�9�Ч!q�(U`��۟ԛ�g�\}��G���1�5?wag�m��Ҡ��R���MQ3�R��QOKB�+Z� ����Vf4W���^4T��*���],�ӵ�$!Cw���E%N�#���#��Zr���慤<�}���a�yZ�^!�<Wu�
[;~){�ڲVW�*Hf:~7KH��������T;�R� ȤG*���)(}�����Q��^o�89�^OKQ��x�G�?�7Q�� �,ʼ�~�
�H�%.D�V�����9K=:����p:x�Z;���N�4ȑ�R�$�0?S?ը#��c���x>Ǧ'&�R<�\���J�H�Q`��ѡt��v
�Y:��4T���hC�#FF���V4���+/�t#t���F��4^(�$��]8 �R����)[�$�J^qc��XJ$rD��B	Hj�9+y�>7@G� WK�(D�K�ޠ�L�8wƍ?"��1;���p��(�uo�J82u�@ز���/��6gK�|�P�Q�<U����~��+�:Ѐ,Q�`���W��tj\��AIKO�DM���
BS��=���?��
ъ���p��ϥ�_g}L5*)�cW�q�Q����!��5�5�2o)J����Jr��t���u׷�d�R)"پA㑇>�@��M�y�t�Ui���E���΂&��"�pȂ~NKQ��7'a�l���?䣮~���,?Ɋ�RB�I\两` 
��/^R����"���(�����P�T�-� ��M�W-.Z"W��BQ�,�l���R�̄������Z�Ճpj�3�4�\��l�F��j�/֠N'��1����Рک�P�ӑ�b�u�9�1�u���M����(y����y����\���X�JHeyi���������s���4�W���5*�!����|D��L��װ�]�]����%[�_���zk\�A�څz���S_���0硳��4g�N�?o/f_���Ž���}��i)Jף�v�d�ةOv�.5t��LK?�ʳ�.������fW�7��<�'i�F���C�I�[��d�@6@�@����*�n�6�p�'��U<��9�z�g���i����NKQ�:J~_rb&�4*����P��bIE0�eHĵ�:'*gf��q���a�@ų!d���La�?*;�:4k<V�4�F���ma_g|1�a�����ɵ<�q@h��T��}�;+��zgJY��Q�ܺ�ť� �~�8��EPl�YUt}��0�1�R�n����	�.<�1�;`���胯|'!�|��!*��]&��T�G�+�^�Y8��R�n}�$*ut�������~�����R�Q69�
�-LTn�0oϘ�aRy�9�!��V�>��	�6ϡd{KQ�[<U:H��!�5���ضY����l����hp1$毂^K.��O%��D��̴��`��2�?�i�~��i)J�o��G�0%�4�g�a����B���Bw_�A�ؑ�78n�|1�4�<*���G�}�|�	����4����iV@*p���w������S%ҹ���h�2Cϸ��eo�/�my�}�d�>�j�-E�!T9�Q��t*UG�h����œ@x��yۍ��Iׁ��aП�q>�٣L Ƈ]�n��:�E��([/�S4W�UC�l#���ꔁ7\a��{�[�2gg`�ҥ>0;Q�`dv�8rA���
�G4yg_W��k��<���z�����%����Y�ij�b�Z������P5��K��;a�����ի������A���ji4�M�[��Ue�y�l��������GQ�U{)�      $   7  x�m�Kn1D��S�>� ~�=��9A�{GϮ�̖H��%���,���%��>K��R�W�Sj3C�������LmS{�����K_����1�o�!PYYx��Z�Ȯ�-�eIV�^$��G�M��1�_$b�G�y�$O�$CO~���y����r��H��Dަp�~���8�7�r�n��+Z�l�o�V��U"n�kćW�ܲ�q~�N��&3b.��J��Y{��䖺��H$�����K���/	;�^�?c�07�D"�x�j3c������l�{}�F��t�Db����Q�%n7|�H
�slݍ�;_ξJ$x,��YFv˾H$��t�aMiH�]"��Ǳ5F�dz�U"�Ǳ5��%�[�E"ͨ��y��/�W���?-A�OIڂ�����̓ xcn���H��|,?��5�|)�*��kH�%Z���_$R�|9G��7�����%Ҋ������J���w����/�Ѥʩ�p�D��_���O���%���y�O&|p��.�e���G��cR�п�D�Ο�� �~H����%2q��߭:B����|�����4��.��ސs~��T����D��%���7LB�)d�����X0I,�]"kΟ�ϛ��f���Yw��'m5L�.��zN/���~�D%;���7��sK�_��N����XO����%*��9�*S
�v��D�{O��AP�g����@�|�h,=�� ��D�y���g���u?z}K~^��ۀg�`};�>��F�/x����n������3��cS2v�st��Bn�n�z8~{c^�3p<���|'"�&<r�      &   '  x���;n1Dk��&���,�s���lĶV�l7zr8�������r!���]�[�j���F�tYiN�I�4m̽s�*���R&L���]�3��z�g)N��K-�crM~�K'��P��,e���xd�7�C��a�dWƄ�P��������"���۸O�%�YʜFz��'zpl
������ڸ^��D�_���b��7	h{AW�v;���̣Y�����0o'�Ǔ(�m�H���:WG�vި��ʔ1����^Gu?����O����ܴ[Ԣ}��!���ç      (      x�Ž�r�Z�%���
ŉ�z�{�oq�
 ё H"���!����)ٲ%�ɝ�.��% ��50Ɯs�I{:v^}��Y�����g�몧m�Q��yu�4��=7qu����F^�c��ECy�s?v]3�!���<�c�>W�3_��:��9��ko��y�ʢ���Ϻ|=iV'<{u�<t^�YS{�s����
~�/O\^��x���#��cVE����?P�������^7��a�O��'��Co��8F=�����c:v�/�.�����1�3�P�	b�hE1ǉ'���?���/�K�X���^Ֆ�K�TO���C����쇦��%i����6��!��%]��^��ȟB���m�6����	<����;ƾ�m�?��U� ��^	�+κ���\���>,�����N �_?󪗤��k�70 �y��!�-�R�_(���0�?�,y�[�U^������ҩ�
���M���*������+����`�^����r�K#ZlFz�����'}X�=M�ޢ��u�E�;f�hǊ��f`8x�h�זKF����C�盥��q���G{p9B�vFI�r�&\3-��VOƖ��Ӛ��jsj3]�j��]���N�J���u�6���V:���s��Q����љ�/���"�9k���2xN)+{{D}s}��G߀ԏ��Ń�\���ڛ�K��z%����#Gލ�u1���x'�b���*/7C#8Ύ9���(���w|�<a���bb�3�~!�/�B������"������a�CC�'�)è~���gë������(�z�|Zg}�\��yH�� }@�����x�� vi���������,���9m�l��x�8���;t�����:o��6�,���y� �>�wa��Y�W O? ���(�@���=��h��H�P�x���漢k����������p!_�Wa��SE����R?�;{U^;��,�~`ԝV[]vqc��oGo��|2g`B��ݩ�v7!���ar��#�@J-x��V�q٨��%�Mbp2�N<�D����X#��+����D[�4�*���aD��gx�̄��y���A�x�����Ԏ(rӍx+U�����=Z��T�f]�>������ӹ_N�Z\�*Mqr���������c͚�V=E�a�K#�!6N�͕��khĹ���I�~���+�S՗�W	7ε-�[#/s-�>B;��"/K�e�A}!�����}2 �M��X���{�T��?<����:���s��.����K#�%��Mh���#����Փ�������i������qx��@��u�S�r4��!�	Ef�'�}ca���+�R�W��B�����2T}R��r.���Y1��j���8�-�5nGS���Y����SU�c4/����;�[W��R���N�2ȴ�4r�]L���6�ڷ
Q���-Z[B�U��)i�ޞ������Ad�a���e	�JV*�]�W']*������Ӵ��p\7�jX�������J���Km�9��P��-,e0��n�Q��1Ħ�R��]-Emjbm�3N��i��sHr�v-V��nYFlUR�r�����U��a,=�rr" ��ҊN`Ta3:àb��O��ڶ��S�% �`/K}±�Y@�؝cѧU��\>�Y-^�O�W{Ϻ�wO�7�}G�΁Z�N����	<�<�� �z���v| .|Oگ �K�
���vM8���������2��������Ċ~'�ʫO(�
N L�$)�]
V�+�k�I�Nd�7�g���yc(����{�xA�
$<�C�$:3#I��(��38@��iǕ�w���o�V/$�R7���;���:��.�=e�b�{�<��ً��xeo���~�)p���l��y�7}+dC�����^z6�<��E1N[]pJ8źe��3�3;����Zٲ�͔���;pE�5��Z�������1�Zn'��.��"k�����sd7K`������j��A&M�	�u�Co�;�j�2A�;�[xzw�/󙗠��
8��9���8B���L�1�e��)T���yaX��b_p���ʘ|ZE��=K����<����`+<��q,T���� rH��Q1 5�rp�|?�"���7 ��+�b���WD�-$a�� h����+ 槦+��i�Ϲ��,���R;��!l�����E'p7miZ�R��+r��$%V�nj�m��9%׽ۈE3�v.�7q_�6�����n���w�y8^F�6���ϣ���2͹�x�앆���x��4X1�v�c�:�}K�ȳ!^�`�/M�7n�6eӒ�ҕe��(�8F��ܐc"���~Xx;7�`S��%�6��ߕ�j��W��2��ՒR�hN����T���^셡�����A;9Ѣ��+(���n��2O� �����-H<sέ"��	Ƣ.�����<"�y:�soCoΗ�H6���8*�z8�BՋ}AX�z�OT/���(A�a� �q�L��d��O\Znۦ �ٓRUԛ_��y�#|�#o�����|Ȼ��C�Ə@y�|���z=����Y���A� z�?��B�|���X����?c��~B�_SRo,�J?���C�'�C���e�.�H���H�~k��FV!�5�!*����7��&Z*e�,we1>����H�����)���~�<��v�*�B��-1��Y�jV�:A���m]�u�D� ݎvY [2�S.�~��\�o+��1&ű7���
������TC�RۉRk\��' �N.���]͘<������N4�5�u�"�k<N��0�63D�L�]V�GnS��F�ۃ���ܪS蜳����$>F��h�tjz�,�;Hes�tGҳIt��>I�rhIӋkwt�>c�e�q�;�G��yׯ�J�~��B�������;��������:o��̗MS�F�Z�z !�c�|�����/4��rw�-��A�W�w���A%�i�ѧ(�**���s�|6#8軴�?+��"��^:C(��M��������b������ÿ��q�w�Yǡ�e�q����Ӫ��\Go{��vU�_h�~���$lS_�}8Jp��C��SYi���4cWI�7WOm�!]%��K����V�Gn˞3(H����[�;-;�zO�KgulLq7;��{;u��L�.@��S�t ��M/#Z����r�@5��ۡ<ZǞ��S��H�;5\�#b�>��!km�Q��a�|M^a�\m'�'�t�	�tI�*�a�,�e^`�;6ԙ�&�>ֱ��i���.��!�iT�3~6����췪�U���t�L��7o���m?�6L#�/B|7�)�~a1�N������Yb7�����eճ�`����lh��;�g�'�.��kq)(��p�tQTG��r��/�>�㹋Jo��NN�0z�n�I�?c��ҷ��'%���SMRS������������w�V��Y�y��'lZ�S�w����/;�K�̂����*Re�x>�\s�VF�$�qj{����T�e�^ ��W�f���s��oQ+��Ʀo�������b'��a>]�g}��e�����%�q#b�qG�FJďW>H���	G�� �ޫ\�,�\G)dĬN�#��JRSiR��uW�۬;rǳ��C=�(%{�+[/T��xm�����0����_��]���c���|֬���V�:د���רjk�i�C���k�3Sͣ�Y��'�c T��C�ꮣ	@�M?i^��,xޕO�A��2 ���#�e��� @�Z���,,����ss?<H�Y}�~<�d�+��f��G~Mq}W J���^����¿"�ߠ���vɇ�����(�߲�p�~)�Q�w8t�@F�*����4F%rP��ZF�����v=�d�}������]�ܢ�d�.���-���emv��;�{g�XK2��[��1�E��f�8Xn��k���)Cqq��������總 ;�Ru(v(Nh�������ˊ�a�%� ag^kq�#*3�U�J�k�:3�    X�ׄ��5wv`��x�ӵ:[9G�ޥ�N���za��PYkPj��/Vl�$��]���S��m&uHt42�X�6L����q9~�x��.-��2��=;�%�D�IPL|��A?3��� �;��7E���g7�U��9�o"~����	�oWyK<?tq��� *!���Βt�?4��2���/��ѝA�wg<�p)�V�K�k���$�3��n�37�[�?������D�ԑf�k9.��"��J�/'W���ڛc'5�� �zL�hv�x!�E���ุ1�{��)��x�mZ��rk���!���'mO
���܌.�Ia[܈ړ�����<��8�:����,�}{S�X"P��!�qB��:�'�����uV&׍�����Vk�ML�7Xt���xZmduC�[tn[�7�+#����S���R.[���L��W���	Y�1�̽�J�2K�����L��
yf�uQ�ؕ|�埕o�/� �w�b���!�>��@�ʅ�����H}X���'�����j�s�C�+�70�wL���_�S?��xe���W�=,���U䕿(��
�W���vp5���&��ߚ��Ю�X>Т=�
K�k����N�H�*Gf��:�	�W�>�����*ⷰҳ��Ag�[|b�M��q��,�����o�����q;�9*)��j���IV��}�x��J\V���M���a���^Wqb�ւ�;��ͼ2�*�.�\�G��`���1~���Ɠ�ϺT��PG�9��ncw�{o��ah�,��2�{���dL��S��|��^O��.��1E�׏e6U݀Т��yf�0��m����pom.YZ�y�h+�VFF;�Sܖj�U��s�R_H��`>��,�ү�?�e��M�l{e=���FY	A�V�>��9}��O�������y���sF�ݘ�Yp�}��EXZ1 j�m��"��:�>������%\(���B�ڰ��`Ve�8�=S���^n����c�PB�2��k�N�Sb���T-1�庋�}�W2wf[�r|��R�g�/�l>Ӯ��z-�78��R� �~�*��
{�*�^�k����⟴ڪGV8�GFp�m�`}	��!��kf��<�tw�R��u�-}��F!T���p��e�
f�ݵ"��WCj:��[#n%?+���1�k���9J+wT�7��Q��R�E��b���]�FP9���:ײ�\'��ߟ)NaaAlQE�`�갛H�K6F��\���ya��B��'�^�#&���! �c�l�[Q�:a{�� ��跠��􎀽�H�a�B��w(��>��@��}?4~#�\������/������ 2���=pa^��������o�n�A!1�Z��i��l�ʥ5�����\đ�e�%��������i[�m�i�3d��͆#i��s��J��]I[b�x�������P���e��S
s�w[!�lzL�E�^��.�(�M>�d�{�5J��mΒ!O�{8)c"d�u�_��-Ø��M,�v���3�^��P*�2�)e�dñ���q�+�hK��v�F�6�ސ��V�M�Z�r#y:�v�<bعTI��I���~�R�1��o[{���TZ���kM���a����n~�2_H��>S��jꞷ'p[S/o�����{��?5/���{�r�z�w�������w�&�ڬ��L#� oY��e�\����r�E���˾�rq@�`!^@(p_�_�ߚ]6}w{�i�o���0r��C����f���ɜ3O�R��@g�U.1��
��L��=A�S�A�r���փ�+�0����l5�$�31��)�.��e��p�&e�f�Yf��j��x3�Iahǉ_�Ki��[��r~S��=|�!�k��b&���)7�M�ʩ��w�>�zV�\���1�W̚p6IE��T�aN�k�7~�h�rBW�]�d�Ň='�%r�1WH6[�ةJw�~e��p�Z�o��d�.;�������&��bWb���C�W]�e��ܯ����_�#��~!�/`g��]7cؓ�,����Aw��ު��sn�o�����9����}��X��s�.��%�\�|s^x��$����?�����Y�������P��)����*Cw��>+��
 �V����Ճ��9T7[-����7�ƽ= *
,��'�׆i��t���Fu�A�h $1[5�Y[���n��9��f���q�`�,�/��f3-go���
�� J�y�B]	ھ/�|�µ��]Ĭa��y�&تPp�q���,�%�D̵i�l��%D�i��-!��uP�s�^����ޡ+AɀF� J�e&�2�U�#�ЅRX,{$u�Ƌ��e7�)�*��m�Ej';1{溕�0�:"����=o�J��f��H��LkJ=���^�N+�W32
s�8�I�	mY���?�������-ż���� ��Շ�i�n��>ol�i1��w|���W�}��V�������p���㫇+���K���b���{��Z�>䝡o�|W9B?�X���}�~9�kQ��[ty�Ed�f&����O���f��8���k��٭)�,7�e�T:�Iv<��$;\���tS�` M��9�ꄌ˴Z���	ÛS�d�*���vӄ+���*���q�uR9z�3Aˢ+�ަ�7Rzf�7'h�P%O�Ӳj��{�S�j�l%�|ύ��p�h �(�۲t"G6{.���C�\&m�Z9�@��	�� &���"��Bu3�'��Kz�pnߡb��3tfq\!.ة��T�%�^A�d�2�B�4&��X��J��*5�);k�k�q��v�$�	Mc��'$ n�AP�nꉻAp}kXxT��T���Y��'�)����*���)��Ⱦ���w4|oh ��w4���
om��_��]E^�20�����)�{8��Я��o�+�����~�q��!ϭ��6<y^�M:��^F��Zy�a�9�U��7��TM�RV���E����J���r���Ѻ�����dttK�P_E���	Cd�*Z~��KA���+�9J�У��X�դ�ANC��Y�g��Y�D1{�5�5#̕� �lS%��A/���x�G�j3�����ny�!+���@1�[A��u-6�@#K��)��M?�E-k���dڜְ��sZX{+�.�|�б�*ް�5�h1[���l��!�k��t���|�is�r����U�<UbGL���&`�L�0����x��M�o?sU�[���N}C�'��{��?d���;^|��~_~g�~��x�%|��_I[��w�%�.oM<=�{�/4<@T�V�rYQ9sE%?'d,lԓx�L����^�h_��� :�Yn��TR�D'����Smƶ�@F�utZ��0�:�n�׉Jr�;.a.m
����a����y${�	�|ig��\)�fm\��Ni	�Sq�7"[�C$��3��5a+���+���{���/�`32�#���̓�KRN6���BqN�a�`��"�[�n��u�GQ�sqNN��Z!R��m�S!}�:QaJ�H�=]a����4g�,�R�=I��z��)�9� * w�6�	'����| �{�B����7W��,y/8�N�G������MN��z�;bn�Q.p?4�~s��'�Wo�W���,��?p}�?)�ê�?���>�*��G��/mЇ�������g�l���pĳ�+Uȹ��a�}�t�9��:	��vsV�~���]q!��>=` b9�:W�:E�q�[7��t�����D�|�o�F��^.��=?=�Pԋե�t�l��2	5Օ�_m{�>Ð��3�4������$Y��n���<�t9k��5�m��d�g�^֤F,���"�"�E!�T��	w��O��b�]m#v+HLA�'��a�$�B�+�����;��9� �'��c��tX�@�Zm�g{�D�
+L9����r)i"sևY�~����}!���A(M�L5
�z �i�5l���⧇�����O�.���p�f����    ������;�kx�W��a{0���3S�}
R�{��y/���wm��;�bO!l.�k��c��:)Gms�dMSź��7$�f)eO�p�Eުkk�©��e���P�id� ��݅s�c#vB}�7D[����6�+���X���Z��AūkDX�:;�k���t�yʡ��ΐ��6��Ͱ-NE�������ӎ�י��"ϱuq<hiv
N����"��7�ۄ��P.;.����	{&�>3��z��6�ө�ݴ�wv���]�Y:�����S0���^�6��v��&���P�ԫ�U{
�Y�晕�H�Σ�Y�f�d�݈h-t-.4]S��x��O�[������� ��׺������+��
��0��'1��Bp��^o��w�o��h�蚻�9�q/=����{������c*
�?c�������Y��S��_�y=�O�I��~�I��2\�_���	�X���m{ru|���ž�N�y-n*�ֹč&g��K�)ɉ�'���4��SX���2g���}���7U��������s�ŗL ��9t{��r���- �H#��C1�U���=}j:j�x�R�,��Ɯ1�K�@�*��,s5�*�nȢm�Ж��]鉆��^z���+̝�x?N��"��%`,O_�X%��|���V�t>rB�6�7�^ǲ\�{�e!W�j�������pr��xu���ٰ�0�+�k�F?n$v���.=T����d�0���[���{��є��ߚ�f�=R؆ ʕr>�%�O\�����g�Hx}���\��LR�n��?�{Yv'�_��߁�MR��ð�?
_����j��rԉ�1/?P�Ǘ�~R�$7pS3W�Nrt�g�.	.�}��>��v(�cp�	�0ѵ�+�*�J!f��޶����3o�HQ_��Wo1�!bx��|�A6���:f,�8��Y���z���r���-5��ʼ!�`%�� 0&��m9��$�(�v��5��LVP����]��Oj|���|��qjSt�?��b׻��l�M-+��aU��,0�KoH%ͧ:��|���
f3��ɺ-�26����5V�S0}�6�:sZnVN��	9:Uن��|N�@f���|`g�_<��P��������.�5�;QmB��3�n<?�N� 6z�����%��U)(�?������
���w��6���e���X�,��� �b����Y��H�������?�{�X �c��WC������19n���k���@K�+��q�v��+��IX|X��V��]|���#+��5��h(5D�7�4�E�4�xC�~U�VV��}@IO8�L��'�ԝ;�"̰�P�÷E�M��[{Pv���cc<�n����Et��+4SrȾƄy�L�#"��zqZ�u�8(׸�颒��zu����궁jSU��A1���&f��M;��)ӯ#&�T��aM暖,���8OX������ ;T���J<�����9���B��R�lb�����,���<�\����5��@{c�f��/8����f���\�՗i�|lb��h��)ᔫ�N��k�|�5_���C��$u3a�t߲�y2�?���_A�m��Pw0���~9G�V�f�#�2a{dC�.�V�����xl#����lڽsp2�a$=#c�qJ�ɔ�U���Ǽ��D��Z!�f���c3�o�Ҩm�d��Щ`j��;:�@�z�O	�]x=�P����;�ln��uل��j����Tb�Q%xk��z��̤6������.Be��Բ�%2!:�����6Ԯ�j�#�n��U��i4�n�B�ֶ:k�Ŵ]7�×,1��v�r�x��Nn0?�0'U=���	�F�
�/[�/��J9	߃�Żh�.UVa����Ù�5����a-ꅤ>��Ú�=�w�5N>ژ�ת��p����~�tz_[~��`���c`�}q*�-��G�?V� �?�^�Ƿ����@���we��Y8�_(J����d���}�K�N�7z�ⷺE2c�km�h]����zS��ۭc�󵁛t������˺ŋ��b�_����[�m!�3��V�q�H��B��h���޿��������і��]r����P��61~�O����Q8o�!�=�n��0=JV�A=��S�R�u�9篲˄����d��D�
G�FUȌ�}dNF6v7E�1�o<S�y�����$��fj���x#�<��.��H%�)\n�K�F���D���Mś�+��U�/�)�����&��rM����uz5g��2aE�7���>�^���/�B�:'�a4F�0������{�<�g��]�Y���D�^}�g�Я5�;�¿�.���a���x=�U��B��5#����mȿcTϿh�߻���i��x���s?��*�ý\_f W�����:�tɉ�"Vƹ�l*��|;&;T�5AmT@;���G3�N�r9�3>Ib�.��*�����dW"���R�xD'�"�&�aY)�ഠ��$Z{�1�;Β����m՚i�T ��e.N�T`Á�u��$T���4�<�\��
�F�2��Վq k��7(�I��ݪaVr�z��G�t 76L��dG��
['�ػk��9WH��-��������!��Vy}B�d���J�!$~�3���%������3�=N��H��IX�Z/����	��x������I���s4�$��:�K̏�=\�'���(��ϊM�X�������м��g��uob~����`7E=lh.��'�?�U�gsh�粈'��
� M�A���i�Z0���������S��A���戻v��ґ�\R�pn��`q=�*~�|>c��32#��d4`g�a��VБTW9LE��`;�^^�=e{���ڥ�0A��{�ĳ�O.��=_Q^'NމU��N���:��SWg͵���G΢<��<�14c��}�MZ��ף�U0m(�گl�b2t��x�m1��j�^q�N6EW8���IZ�<���z��Gms�NUZ�R�v�A��\�9���u�B�<���Q	�A�{CJ�9����Q�b#IU;aj0_i��yon#J�}#;D���Y8$����@
hy��ʼ����re�U+u8������>�{vZ��;�Ga|�J�،�Nk�u�h���^���u >z�e�|��=�oa�e���A�I��ď�,��'���<��.�������'i?ϧX��]��帚Y}9
�r������pe��I�,W@gغ*�
�V���x]T�������ʝ�C����
��@��EI���y)���uu䑘�}j���y�T�`{d�>�q�1� +�qUN�΂�Z�4�T'?co��	`�{K-�)u֣X\K�驵י�F�L
���s�Y�w5�^s��Df_���F�8,�M�� ���9�������/�KbW��z9��LJ�bM��gm�ڤ�ayBo�� G�,(�m�l6��d�}oH�?���_H�^7&����.�y��}"����W�L*��r���������w��t<������~�<m��}�i���@��I��i��Yy�b��x�Ϝ��b�����yO@�k�^+]8DEw�X��WZ�)]�@��:#�e#�q�}���~��=��Ftu�rR�5���K� @F��4-g��g�v��r����$���&hD(��J�]Qg�dU�{܋�]x�^���%ݕZ����s(2��/7m�t��<��[�\$�{��^-�:���1nz�� ���/[�l����") mhB��H��d�ʫ��ؕ|bM'�~䍈qj�TOoW�w��Y��ę�5�Vإ��H���o�܉ʢD&��MV������Z����/O�(��?+��`^��J�N}! X�{�;�� ��l�C��`3�KH�kK/}�(K��:��?;�c�0ĩO��Y4�o�||�
����r=�BVF��cx��$}��7�/}�ٿ��s���������x�����3�V����].:k��԰�e���C�⛴#�@9/��}~m{݉s鹷7���҆�8�C}�еY������S�A@���J�%N���r�6�*��p=ҝ �  �\ٛ��w��$���M�[�{�S�mx�挊�/\'"B�J�`���^]��_i�}���?����5|�ZO�E��M�ۃ�j7G_=�*�}dta��eW�+ZO���V��c'��J�.Ve���+�Lj;�{����)���h(�����
��69:�簾q���؅�谾��c�89�h�_�#>�)U4��<��[���@�~_��a��'�닯3a���f����L����$���o��P]z0�Ç�� ����
'�����U�[��g��U�e����E$���6/�7F�Z,Eqq���k;���j�L3��}J,,lnǡ�9�ъVs$PZ� b�x��r2��Y�⋄C�"~-8�!�\S���ʌ(8u���O5�K��iTq3?C�,7�*��냽(uW�0��i"���k%�[0��z�z�PL��k VRf�~��Ֆ�#o����&�b�����-!��Q�c�ܚ�>\X�J��"LS��q�Mŧ�mt\|���~����RGWsbXՅ.aN�Ť��yKc�aЛ�3�v��X��N$�פ�4}S�n7��)[��'�`�����>��f'�|ԇ���fY�>�i�P�ާ~�]����?����ޜ]��ly�W�-��ܖ�I��բO|���1��d���Z��:�[�s�����{=���ͻ�k�f`�lf�ak��ï�x��ศ�خ�A���p���ir��W����Q��+�l�O��J��E�p�s�X���o6Zt�6'hIN�U�0'E/���&�_�[�=�B!��*rN��ň��Q<]G��c���}�^ΛK)�RU#�K�//Ų�x}�^E#�
i���FQ�P�o��5N6�<nb���Jj*�8d��U_�^��Ӥ��:��k�'Ӯ��.���]Q���ek㄄J3�_�D1�uY��$5�:N];R�z��-�9,��*����m��L�F���%�g�������o��,Ao      *   H  x���Ko�@���S�t��׉HADE�!!.�Ʈ7�C8I!ߞq�G>�e��I��f濑H a�1DR���]Z�c��>�y��u�u3��%<�Uq���&MW����z�6��sbA��Qc�\�2�)7��p���R{��t�-�JY����U�ʸ������ya�6��땲D#��ț��6pYW{�mxϻ&��p���.�Y��g@A�D0{씲�1�(b�ZI�A������/1��zO���Y���l�.��h ��"���N;��<3^��;{%pr�R��_b(���4q�5��u���L�SI����N)K����:�wS�g8�_����ͯp�q��x�U���b��VXm8�1yk�h�M�Ɯz*�����6�Izr�3ą1$�v'v�"˨��=����)O�=���!�(��p���OZfe����Iv�爣�մ�\�m�[��(�f����%l܎X�/�8%l��߇2</��\��1>�%ܔ:�Sl�l�ܵ`OCa���:��1d�� Ҍ9�W0I@Z;�tjNBj� R\�Eb�ϓn�a�6C\y�	���ß$I����      ,      x�żɒ�ض-����ٷ�,�Pav�=������k|�e��#���#��Lə $ͱ��X�{��!~e����*�������y��2K�c2���ף�M���q�M�k�<ux{��h��>�����g��O㷴i�2��lx�����~�y���ǿaA#Л߶CیO���O��@�F(�������+<�a<R��I�ǁ?���������ǿ1������-�~����f�����K�_i�_�Dq��(�?f��>8�ߊK�JT?/�1�X�n���Y#�#�⿑C�!��!La��֩��3W�G�{��8��G�#<A�4�	�2��@-q/BGuM��9ЮQ6�}�4���E8���Vk�ׯ~��g��ĲP���zU��V�#�c�0��<�W�*\�Sr�5~U(?q�t���3%�o4�Kh�j�B:��/I�-~&� C�	+>�t�k�ŦB�p�Ѯ��ki'�-W�������"RE��i܍X!$�*W�S_U~U{�P5�n� �|��y���Xxr�4�����߅)�6=x�Qn����{�U��e�`/0�B�I����o�˰~+����x񫶌��2�$/�����o���_`���!��@���W���"_�����E����#��W��Y��~_�)k��/�$���|�aX��&M�:�}�W��2zM�_M_�� Ao�s�@�J8��3|��N�v��Y�8��Fu�_7���6��.�R�)0�$5R�mݏX�=��M^·��"�&&�X�dͯG1�eV��M�2��e#����?f�����s�����@nj*�ݯ5|�|%h7��g,�r<�g^�c�bE�����3q��Ekd�HFZ+ڠI�5XE�r��O�EL[��q0U,������=�t�>!�*E);�|��	�p^�5.)�|FI+C���m�u�n���FH"�<��K��'G�lF?#-��Ȥ!�t.��\�����6�_�z!�'�g�������o���G����?A~���( ��6}�j�q4��}Ӿ?��������5���'
�� 8Q�����x�^�7�'��W���{��<D(Vɂ����-5�bX�0q��5c�9�����Q}�U�}\$H7�u��z]J�{9o����m�qL��K�r�z����&�6��9��NB�5���xV	Ө��8���T�"�"y��;Z&;��ȇ2{�/�?+;�L�/h<Jr�vÊ�D�{�T3��q.eԝ��ɤ�Sz,E�<,�n����8�06~�*�E2n0�]R��]	HjJ�S��@�S�H����T781��Fz���%M���^؀+u8��ZP�s@`A������0 "������j�@ ~������x��V���#� {���� !�h0�_�{3�����W>�Ǭ̶��?^M3��C��������������N�~�&�����%_�~{��Ι�_	��ܖvz�{FM�~O<v�I)4�#z5��u-1"XӨ-pDsw���yW�ʂf�1ި��L�nZM6D��y>{��B��t�]y(t�[8
���m�]n��� QJ�zѡ��H4����^�7��H�&�9E�bO>�F9Ӕ �I��u�v�u���`n��vL�$��F���S���[�8�,�B�j}n��9V�_0^'I&̇ ��z�~ra�-����`o	Ay*�9ib�jޥ��"��SA=���P����sQ�ZOÅ,@�����u��&���(a���>�I�E����D��|`�#�� $�| �~�P������ۤS?�~X|���( ¬�}ޯ��z�l|�\�O
�v��O� �+!��R�}yP�l޽"h�z��[�vH'x�H7"�&�g�%�
_x2I��M+"y�I,E�h����Z�ȯa��'���q!d2m��*��b]�p\�b��G��B�Mq��:Z�8F�m�9Z��n�4Gi��.��{����	xZr<1�
�:���ʺk��(V��p7�J=(�r�dc��.h�~�AwPsZ[ژ	�M0sZA\��;I���V
��!��w� ���~<�2KWl���k.Ǟ��}�����*���,^Dc�΂������d>������2,ȝ.}��[�+�[L����!�]�K7�.!��d5�?6�&�!`|��#k�}6I��}�o/�O�L���B6�.��(feX��Z�@�EL*��q:�(�ŝ�1��<����6/f>̹���SWޭ�r;s�2��N����'��y�cS�I��Tj��<"�ɐ�C7L�ha�����Ձ��,���������èydNG���nH[��wJx���%Ty�\�2os��)�� y$�&����+��u�ɼp]IL��)���̲`��� ���nF��ܺ��|Z����a��`�+bG������D��a9�{��e�>6�u�o1�Y�F���hf���J��я"��P�]��o�����@~��7컲��һ�>��b�~�{�_5��<����������g�����]�5� ��?���_�F:���Jiv����+�&[a��K߈�{~_����F�!�|Hϕ<#Ǖ*o�n��!qj���Yr�Cu%�s���:��Z�2EF3�W������?4�6Y5?���%9_���xn�Tۨg�1�e_��Ǹ���M�+��Th�Va��t�r�zK�w$��\ =�86�S��OU!	�rt�٥�k�����^�8�A��Tڄq��wf��sj�<Zs+jT!9�}>Ӑi��)N1_{�]�Px�\�f��}0��:����!�ʠ��c��p�̔Jh��k<�W~��a��SBS(~��q#��h �?@����R�`�;h��`�N0�/Z6�M��I:�_���C�y�?I���&�W��jÀ;h��)���$f�0F�a��x�U�5d#�BN+�e�ۍ�=�7�Ss��M�6��0r�E0q4Ր�.��*L�ӑ�5�1�Q�*��\o�{wn��IG��z_\@cN�)��*�<���%S��+���򮖏.�z<���4;�[j��읭ƹaE?ᓐ���2�q�5�,�	}ڎ,t�/R�k�E�0l��!*gR����AxB���1?PW�V'�vM$�p��=R�Ǜ0]�=
�
B��#9r<�'�+��?T��Q�`��)�}���ם0}����������i����PA�a�'�G� �wM/R�g�s�5�a����r�~7����Ѵ���p'Z�i�<�����/-Ax��C��ہ-X��D���:z���n�H�CwV�sW�����J���'�̆,a�Ҷ�-��iR�"W�����H\�>CH_�p�T	�Pr��a�"�vw�'v�;�<Ҡ	lځǫ[�:FG(�����e�U\�6��цv7C?�^�h8=sH� ��O�Գ兽�,��� ��PJ:*�r������`j�R6Y�dLfn��Y�iP���3]�;'��L'�J-��|N��b3O���j{���\Zʠ���VX�������y9�I������H�T='���_���.T�8�������m}7�J��3)�&E�R�N�a����^�f��>.�[y/�}��i�ﮕ��Ҹ�ү_��-�kqO����W��e�T�`����$D��9]��<�9���s�\���Q-��y�j��֭K�ha;&ΰ����'��^&_꣦�9�
sa)�r��+��&��� !B��i��T�7�h����C�h�^�ND.�b���]�b�zg�)�1�ҍᶙ{h�mk��C���+��*z`[!�ϲ��׷��\��]Y�$�{�>�wZ�o�ݠ8�́�TPZU��`|j�C�6E�<j�ٴ��d�
���Kx+���H{:PW�ɶP��L8\&��I����p�,�L	�4�q<�c�!���ۜ���{��3%�_vW"�oH��]�#o0��L��.&Ɲ����xU[�{y��K�~��i����-��S��!���+-�&�I��Gu���t��X��#�D{��u5/[ӊ9���BoI�����b�-��ch(��;�7z��hD��A6lգ�lG��̾��Ubx    ���2M��p�R�acdފS>��y���>ޗѕ�㵟�ޮ�׋�ä�3u�x\� �?�\
+�n�s�/jj"�Q9@�]���Һ&�,PP2L5\�	�c]���a-�������H��P��� jL�� :���C�g��n��R�� 	l�[GZ⇛?�L�=����Y�������L����Y��?�/0�F��$f�0��7
y�	����_�Q�m���?!��h�h>l�w�wY^��F��,�g��+�p{��6P�M�a����� �DJsS3iX�빡x�Bt�|�xɽ����1���6�%��k�5(i�l?�s�]9��8ge$�E�'�,�U��n��z��jUۭ�Z��
ǧ%2�DV-& ���.���L����[-2ͩ9B�����oa��b��c{z`+�0�eIB�爌ƥ�<�� ��9a}�A�x�\ң�{d'�\�tѭU�����K>�"��'|�s!����Y�kQ2̠(����0v�m1fy����9�ǃߦ�SU�|�@��@z��G)qV���}PƦw	��<�R��Ϫ��ê5�C���.k��7���_���e<ho��S����o���Y���$�������O�/M�VXB\���O�]�J�0h���p���Q�ٞ�Zdxշ�=�2;�P�V�}QST�0��]��Q+T�r*Y:���۬�^����xj}��e�T8�������]��e�x�����(��߆ۀ$�t*Q��vl�@H&�!�Rv��JQDe�i4l<�Պ�D�[IJx�|,��ị�<�.lmM�n%�����h{����jJ��ƪ���H�'��s�� ��	s�51M�DYXXa�ӭ�OU��[����!�za���`U�e����A���� #@d�`/H��Xs#;.�7�����}�H��e��Y߻3����?,I�>E����N�^�$S��"�dhN��s�a򎑚�z.,���Y������� �$���z7�󵧶0m�,ΚO����B`D�LL Ba��{�\��(�u�����g�:D�:W��\�kJE�~�t?z��O;�b���c�����k�$-?�k.3�U\�nR�� ϖ����ʯLZ��k�
��肹r��3/>�`�Qҩѧ�,���;eė��֥9�P�������ۍ�>J=�')�e�^��]ߞ��C��٫���$�.���z(S��Vl&N���z�n���疏��{�x>�W��j�P_0��n� A��Q��_̩NJ���/ܭY\�4��+ws�Ou�Q����X��6rt��D�]զ��͆�#�u�1?�\J��3��1����/#�o�������e�5����N4�N*A�/�y<VX8rݳ����M#��F��A�z4e8���3���4��zG�͌+{U�L��0�!�;�������t��@�?I�6�o�4�u�R8��fܱ��eL0�W�TzXl]RbO��@�Fp�Ϟ�s*�G�V٠����lY��-�]��8�#��A8�-���G<�LB��"����+Y�c�>�m9W2D�6� �ld-�O�a׮����O����C�bWן����߫X $�(���;���a��oM�G����볁���� �w�M���3*�S�G���_Z��2]�
�5�DXҹ��J�p�p0t��H����]n��I��Za�� |��U���M�MS�G�����5}�L��2�4����h�/�r�( �4̇�̢��v5�jG��~�\؜=��
�g��.��;)��������5nd���W6m�8�kB������[+⏭�R�����5�c�d�&�N�..U<�aW���¸�>���o��'�(D�Y�K��eK� ������䮁�B�NKɖC�hT1����N�i�G�:"�!�`�3���Q濚�*�}m�l���/50~��<���o$�M�S9 ;y�߃�b�2��mz������?F�{��}�������/-��"�f-���su9Q	g���4$m�W�t�`�v�ʷ~�c�ư2��o1�F��j;稩���L7z�3c�Gg���k����՜]�"
�Zd�#��1\L��m�3������N��|h��r��j-����b�>����n���n~Q����{���i�)Q�yŗ�ȊNɍ�.6e�5� ����m�ի��Z�v=�1���X#X/({e� ����/'	�
S��I&N(��c��� '��Ҹ��;lX>(i
�~�J���i(���P�C
�m|�N�����L_[��'�漏
`�V����y���]`���_��q�����3�FD�{��,�>�߁����_�U�N��w�3�*��W�0�
/�5�#0�Z���4�e���WH�b�7@���'��B��։�h���Zn-��ƫU�f�����52��w�.v���$h�a��a�W�{�y�@kl�Y���u����u+Lݬ�,�~�n�zJm�<��~�JX����t�1�B�%n���8*d�ac�����7�[��	����hY�XW�:vS�����4�*�0���n<뮾t7k2ڻ�h�$3>G:4ԙ����Hǣ2I
rӪ�vntſxK҆�@��+DqكN�ώ���>|�Io��'�Wx ϦW�ſ)A�*j���,	!^�{ֶ�Xy�����)���'�$����(FO|D1���a�x�
������K��.��)A�i�]»)��[��I0H/\h�܁��ՍI@)8�+d]��l�a�bzX(ܤ��l~��)(��z1��&k颈�;�p\��V���(G[|uP"&�Y��B -�_/t���Ev����O{�K�[��}�7D�Mft� =��@�k���;��pd�+����(�� 9�����+n]�Ӑ�4���~"����YL�g���\�ElJ"�Q�Ӧ��?3��z+XtO$v(Ra8�b���3g�pO�$F�.X�d�o$�V�/X��;�Yl	=a~������;�ǻ������I���9�7a�	��(�b�Y��ῆ����a���_#�ϟ�@~ir5�8��� 1"�z�e�m�Rݰ��£��iZ6�d/::-�L�7[�ƣ�o�G�OQ�Ҡ��B�����5��E4R]��/�(bdrym��0���V��<Cs�K���|��x��=+1��8�O:0��q�$%��D�5-٭����!�@�b���O��.�pp��{�hRc�ݺ��ٗ�����%wT�ȣvm*�CN�5�v���MJ�8%w=�m#U�r?�J�
fL����M!��ŻD(���2����`�4K���r����x�����)��ㅿe���Q�~�{� '� �	x�����3� �Ю� k@�����G�����Zk{�O�wXDY
R�s�!3���:�fYy_���SBN��,&��<M���A�����t	�B��|t����b�� ��jm.�-����Qvǥ��@��ez��,����U.*�A"�5��ܿ*�	E �I�5L�~"oS������p\<!�{C��@АC(�񶊠$��+�̼v9��g\�=΁
ΦE���3a�#$+�T8�y�[��Fl�[aA�^Jz&M��-���~D��.����1�*�Kuf~���D�>���69"�1k&�cs:x`�:���o�mi:ꃑ�Gd<7yb����X�>s�.�W)�yQV}r�O��t���-{��8����7}�Ol���.�E��:~6`�S���j]���rgP����&�ǅ�T��~d���Z�z3|�@��	�Kn��'P+e�(J�r�����D����b؜��,W����Z7g�:^����L!Z�PO�3��plu:0����<�l��)��Kx#(�R�*xX�i���ٝy&�|ǃ�#�~���@�Jڲ&\�$��`�1�}��=O����T�}����ך���em�K0��e�S".�(��7�<�˲���چ�bi��ZǺ�c�.�E;�aU�m>�a�l�1ó#7�T˫nRŕ۝I���g���)��Ϯ9B�:ɥ������}���k�����   ߳��բ@w �~_���.N�=����Y���Fڝ%��"�~���#p���E6����cGF���?'��e��_�E=�'�/~i�`�`��w�x�󸉜j��YX���E��R�@f�����u��Dٟ�Hނ�Z�`��������?��-	�Y,K�4���pc��д�zq_��@���憂rq�m� �F��;�KLN�or�ꏄٿ����׳��jS�y��<�w���F:x�������ؒө��Q���`�ăY�+�"f����k:i�ԍ{�RQQ�@��\�LAg��yu�Ǘ��l���2tV&K�s��zP񐿈�kY����1�c�l��Ձ<��|*�� �?�O%B??�/ԟsH	0�<H�GNR�-�l�{hA_X�������:$lʦ��&?=V��� ���,��A��e`:s蚄l���%ʀ�$ā������a\�hN�ݡ*
��!J08��XMԸ��4%%�D�
D/��9�ensh�;��h[\l$3����r��.��x��P"�� �|Ō�sn����ٹ�͛�o�7���]����H�C��@ @��Jt�m�ާUi{�-H?�QYk�ox���!��'vS?��<ot6""�,��b��9�J��ʯ�	�����Uxs#L��;T�m&f��F�Q읮�R=�ي��a�}�}-s�H����o�9�/�'� �;�@iP�Cއ��E���T#�C��{��g����cP��Վ2Kvl����"��T
��q��y �����o�G�uc��U���Esql*V�Z,�w_���L�%:|^�Zπ��&/�]�k�
1n��)> f�P������rJ
�O�|3Q������Hl莈�s��0W�F��xI���+*��$�Ie2���
<m]�U���:㷴��8�&��%�.Ppr5�[5�{wJ0~$��9ܱ�V�T�t�(f͙�<Z�lQ�|��eU�lP9G
���(�/7�}=��O�\�[���R 1ë�u�
_���+���|m���?�I��� Uߙ���ߩ}#`ZA��of��������0k��#�(�#����ƻ����}6��* J�4��݂2��q���?P
��5�����W;���n�u[�p�K�=β�͋-]���9�<��&i�d�%Hkg�$mbe�F��vI��X�I�K��/k�,�b[�`�6�2[�)9����J�٠A�c
(�,ozg��G�	�WD9}lTe2�icX�Ε7���{-hx�7�.�ht��ʅ�6��j&_�\�` ?;�V��Qaj�z��A�-�=]uE���󃞔�V��T��e�F��M�w�B�>��h����ԥd�Z\��= 8�7Z>ۭ�����ᇯ��+Iu\,����pk��yw���]�W���
l���߈o�L{�+�~���(�b6������!� ��jLU��'�����m^ۏӂuW��u^�:���}?�?@�w����z����raD�ACTG}YP�j� A� [PT�5e��þ�sHxt�z�t:�:MLc0)Y&��-$���8�"���],\d�޵t)�����ۃ�C�������Ϊ�a;]eĿ5�tHX�qN��ƼhZ����4���G��p�9�0�X�Cl���K�Q������I�%�C�xˍ���7��X	���J���p��9�J� yQM��A)m�c����%���>x�qg�e�X����,=��爆��#C !}������$���d��H�Ԍ~ɶ�o���7����]����炙P�A��E�����)�_�]{.��9��z�?�~~;�K�����г~�ԃiĶ�z��;n�7�$Q����8���F35�������<�"1�w��re��2=]]�{F���ѮS>goE	耫z^<��jhPE��uz���N�V]����Um�9� �`���\�u<�j,��Ѵ�UE��Xڵ��8��*��Y�C�4a�rx���i�h���Q24��%56��RpHA�ӻ�i��E+ꛒሣ����C�e�8^ 2��E�<��z�q4ɀ)�:��FVV�	�od
��	[���r���W~�7B��4+����C�f�.�'n@z�F^į��?ޢ����?�ҹ�4�m���NĆ������㰧8�[p}�#S���rz*���i���Ņ������3�2ME��6�0Y�	?F� �������m	�{T}]��ћ 'fc$fwM_t�;���	k�F��*��`���mb-��q�ă�(ŰW'�W#�]��9�Y>�����)�K>^�L0�4�F�4��D{"�3��@�{�{)g�9��H��y���C�zxXɇ��CVS܅*ԙ+%R7b��`b�T0޷���f���ؙnY�+�~e����J�����
w?z}N�~H��=;�#a`�������ӯ7�ޔz�Q�]�|�~�li�ʌ���^���@������W�'T>v�^�f�e��s���q����#�A~i�o.��8� X=��>��)�Z�<+t��3���[ח�JO�(E��c�K��h��@轞��3i�nR�:����x;)��� P�~K��r���َ����`sݢn�Ǚ	�cy�5"+�+�6�$��9 ���D湑���)OչЅX�#� ����;&'���@׉��tE��%3|cAg���Ӹ�������6����1��q ��i&&�nQ!>��-�gv�(�;��NOp&[P~�,�8�"Q�ȚU<�����-'T~�#Dٮ]�4e�a�`��:#S'~v��>hY��̏hY僖�b�?c�N}_�c���W�_�{��(�l��dZ������h�S��?�����8R����pf�ZYH.?��*��G�0b�A����{��v�XZO�$�-^�8?4ߨ�$�=��Ҋ+%���d�Mu)J -"�V��v=�a�ٝ��WQM��x�wtK�
�T�qMfC5I����$�K�h+W�?He}�A�׉l;�憕ÓE��l,x=V�ŏ�2q3�%�\G��$��p�N�C*��Y�>"��&
p�GO��(zd�ĺ1ӣ��C[�xf��l_����[�j��P�[Ё�X�A�Z9t	}������y���N��� �����_w���3�؟�S�W;B��S�����U��s��?�G�{y������^�f�O_��O����m��.�œy;���O�����|�<�ΥG52~t�G	��আ�0�̌-E��yܽk{ÀA�.���>CW��y	J
�MX+v'��e��"]氄���vЩWZ��?m.�t$��Ѐ�UC��#��
#�_�;V�����C��Z�G���q�BhFy���TU����]��+� �,���4[c3)�}c��������9w��u*<0u��i�F�������ܩj�uV4��:$,�����x��J���`φV�\�:{s�_�&���9���ߢ&��k'ߺ6��ި���t�g��B�����ۿ��������      .      x��}Ɏ�J��Z�
VY��&��Q�DC�<.	(��(qM�B��m�C�{Y�r[_�f������U����a@����$�:���{�]S2 d`��A�Z��t����Af�2h�Uu�Yҡi���i�V�F@��N{��GZH�F��V@����F�;���j[�z�� ��q��4͠ݝ᫖�d��*� ��?���f�����3Fs�?�K����;�	#��ɳ�±��y���3Л��Z�Df�-�c%~����^���0}c�z�t}�Sc���w<��֦j3���w�f���FN�c��t��;DI�Y����Q�k�hN��qe�dLf�o�7~K�,�����}�M����+�'���x[r�������9��w���6��E��O��rQ���_�F�]/t������n)���Ӳ:[y؉�~�@/�u����Z�)�2��"�,GU��|��|���9U?��Ю�z��b�G/-��]ӵ����Xr�7�-E�h�{�f{�uP��`+VzB5�ǂ�w9E'�'Y5}�+Ͳ
��ٔ|���>���f 5f�JS��&Gmƕ}�Q|�Q4833W�[㡰܋�a�s"n�Y��b��B�����c�w���d����]#ñ�	����Y$��Y)��,+2P�=?Q�!�T|�p� $�Uߎ�7�"&�G7
1�5�N'f���c�1�Kjp�ug.��t�pV*z@�����*��L�~���A��@�+���Q|FDH,�c��6�G�]ej������b(_�x��3t7��.Ao#S�X�13j��8�0ї������6�E�sD��T@8@8���e�T$B��%�M$@}!���k�>i�V7F"�A�n.�������R#7��Ɔ����������H�C���h�Y(02�R��<F����[��VM���o�U�����k+zağ6Nzs�:��o�
cR�fH(��:tQ�#�к�whm�bZ0t%����p��Zf���::|P��0, )tH�(1##:��~��7Q��|g�}-�;3�T�\��R]�-`�������z��#��j �������y�MP�D�O�������eXAN�"DI῏�����Y[�'��b<a`����U�p�="��~�G'B��x��sh���������jXʅ���\�C��;��|e��r"���>D��"("ga�{�G`E�@�XF��ӑ�����{�]�)�c03v��v	Պ�9�L1Î�@]Ў��(@e/�1n��-����s�V�Y*�M6B�/��
,�=�	w
�p�C��l#Ӣ[����Kc����ڈ&A�y���B�{���d�q鐢������C�+�Z�kQ��dG��Ť![�����r�Hi�@"D�a1o�A���e���Qpq�}Ў���8�A����-�A5���]ǎ��*��G�{��	U��I^�� fe����r F��.$B��(��/�V�W�-�E���l��TP�3�c��/9�od�U\%|.�o�}���řT��>��Td+���q?B���jo��K��J�����Kv�П�Z�E���+��GEhW[�b��F�B�)����ikp�_v��r��6�z�u���s�\�/}n]����<<M�f����Ɲ�L-c��]E<v֫b�vb{��kT�5J���әS��:��˶"OY���x����5���Ji��F��7u���R���4}��.FݵSyaO o�����ʓ�R_��խ�l��#������7�!�xR��e���;8��Rs)��ޡ�֡^֮���U��l���d��3�<�?� ��7�@b@��E!H����ȯ*r�r���'��]ڣ��ꄫ�ⳓ!�t(��q��}�X*�Ӥ�_�ʂ���s7\�mB׋�a�s�z�bF@�J ���ᥔ�8� V��w�����v���T���x��*=���K�0��b]�Fϲ�~A{���A�g� �^|���C���V0Kp	�.Z��:���6GjB��'��idH�(��3��z��)����r}�=�Νn��Wt�GZ|=-bߴ�Z$B�%5�AR�����b;��mmf�]R��y�����gF\L���1>�DDpOp��{>�ʌ§���!
(�<��y���.邋u3w�`}N��|u�B}!�f.L�ZY����ȝI�����8�����������dFT<v�!��e��
ʸn�O`?�YU���=��%%zN�7+���E���D���6�����ip)H�(.V��TEy�*�����6��r1]:hh;�ϻ��o{�	��r�e>���Q��GEy�l��
�����-��\��._R��3�Up��@�6ě�8PWM��ԳN-�8ӯ��8�U�#�&��Z�6�mt����Vs7��	���X�N|_(�'Ŋ9���p0Q�0O��*�Y��o�qT߉p���v������]ؗ5Z�	��	斕�ı�h^[�e�l��P�.����z�b�_�s��b0�r�@��V��ZSl��^rqUP9�T�V�cEE�E��evسG��Y���K'�.���'u��.��pҫ4eq���������1�W�n	1'�p��ętT��N��%��Q��?r�o��]u���
?��\���	�~E|�2��A�#�C!��L���5@qXA�(�	��"����C�`� }����"�=��s`/fy�Ҍt��a�XH���h�j�6g���"�" �(2^ͤN��������{<�xgx.%�O�(k��;�q/�u��V.���B�=�� �ϝ������z�����OA�����A�m4�8�i:q�cS��oJ�6i�4<K�x9k|vH܎SҸV �>a��X���22���%C�b�@<�M����b¦�7v	�.ܼ�g�]�;���ﰀg�<d��$C��B��[_{+����!�\����ɱD�|�Y�	柄y��FHӂ�!���`!ENo��zy��|�<�����P1�� � }2D�X�ޑy��?��*�pv������<.�6��{��<)CD	�	��~��8"L�8$C�^!U�-�$'���7�P<N�ǣD�jƹ�Wx�
��Tz���x��E�%I>!��	�g9�QRN�$"�2̈�.i�ԗ�Z7�m�&�^T�׼&1:7�����0��}�6�}G�K�SX��IIC�m�9w�\Y�ۜ�N���.&�N���v�f�=kf6*�`p:��^N{��CMF�Y�6�^�5s��:��bP������m�)��X�������춾��U��L��T;���/7�V<��ۊ���U�xl����V�X��U��W�~l�ն/�u�L}\ʌu,�2wxi؞�1�ݹ��5Q\�-��w����聰iV�W�:��:���Lۮ�h���KNX;��C�Y7O���\λ�"�J����>�N�sP�08�c�md�����=���r�l�:f�|�����d2���j�QE9Ā>�Z,��R}�97<���m���9�,�J^o�:qo�vv�<z�}��O�O��
|�c8�!�Q��p 9����M�x��{�i����n�"65/ce�,��hb����z�	�S`�a��Z��!

(�`��"�l����$����s�ὰ�r����XK<<E=^N���'��	�S��a_�Cv���
^��s|n׵�ɹn�/"�#-��,�#���\��|9�� ���s���2"�����b�H�R��:�SϹ��B_��x=�}��rH�-um���7q*��3>�pU]�\!�
��4Ф��z^�KD\z���,�������"�ٻv���Ųm�q-���=�!Z��
w�g3@@h/��W�k){7����s�_���z-�;�{
�y<�M��Q<��gV\-�t�4,=�$��*�w�	�WlQ��d���	R9����ĪD��!�k��i���F�2    ܣOޚ�Ҭk��ŰQ��ܥ�����G�ݏ-ǰ*t�u�ᾘ�:�Cnq��>T^�\�k8b��檄�_Z��Tk>��G=� /�14��׮@]lFz�7{]����1ظ��9ö�\��|��9uK5Ċ�4-��z:z}A)��&0�����[�^4�v=��6@�*�}D輔u��T��r!Ч��ۛ�"l�0�Aq3��l��G��T��0��zn�B_���b��#uj��eŜw���0�e%_e絍%�¸���e��EO>�*6����϶F�ܬ��x�	�G�ɴLT4������S�����X�������?���p������X���#�~�.������V0��u_�!��n+}�nKVz��g��'����KX���+ݒ%�P�	�J�)�m2D�2o��M񖠟��=�s"Ĕ^O2D�
�o��5������=��"#�)}�d�X,�J_,���=�,+0"���L�(d�[��X�%�'��Q�<N��QB,�J� �<�ǰ0Ų�Q�4�Sip?z!9I9�ÇdH� \�Ǜ�{P�i~��l�����9�nyV����7F}'w��?���֨��~�a�8+����Aj΄�X����T���M%��E�\�J7#}7��A�"�܎�,|�~�^o檏�}�<�N>�B�������P<�0������p��w
�vCsl�藋�h���B��X�{�yw��F�pY�.P���CU���0���va�ՠ:��v��6C�ms�!��^ީ
���ӆ�w�N���9,�e�8��J������a���G���~�˥�]�6K?P{c��ģ˧5�W�ހ�z�ٴ�} c��j�z�ʹ��[�u�>����+��M�h���51%#J�(�����]�H��v~�����˾?�Ӗ]'���ܫܛѼ3|ղ>��CA�!�m�LZ���P���/p����.�;˼W��:�!�sU�`���e�#zR�ߋH��<�֎3BB�g�^I�!Jq{TNo��������u��ŀ�j��&_��`�6O����,LwN	//��lE�sJ�4���ģ�"�����pJ��"M�F��ÿ/(�:���yl�x�yE�!J���B~�xO?��A�	�6����D�B������.wJP�yNN1�}$$_5�{E9��"#_�sv�^�맆���A�w�����Ӹ�����F�%C��bS��h�bE�*��HG�O�>�X�^���'?ӍHwR4<�Pf��kN�C���͑�q,7����T*����չiЗ��gk0��������qu�P6d ,x�J��p��}��a�����_�pQ���DX���!o�4�蹁Д�N�Y�%E�A��Dfp
�tf�B���|F�TQ��:��oj��"���\w�Y�niw�.�#WJjp���_N�zb��}6=����[�^���s�W~�3����>�-n�_���e���O��θԮ�'�rY����Z��x��}8�g��%:b3w�T��4�M6�0�ʾ]>��u�?uW�XSO��귺�8�f~m���[�Q����
8my�ONAЫ-[ՙ8�E{�����nG��P���L�{�[ȽSޮ.����;#�7��6}�B�W:bZ�f�px��
�) &��N�j՚O:��z0N����JM��m�߄X�vE�@/o�F��[����a�l��coð%���3����ayP�^@�P��\u&//�(����1�|�#*�,T�q�}��z��9���jq�kh&�qxǑ7g�U�w�_���0���@��/g���(����s�?nz7n�j�m	$�[ZLF � ��zv l_U�M�!J2��ؑ;��ke�C�P-��X�^�Ԡ�����}θ�4�'PA�q�q���^�F�#� �x#8����-݇(Q�ķK^����#�n�s�������͗s�~!v��16qBu1�|����="��؇��>D�R���������~M��4X��p�Z�cq�����6��?=�z���y�\�|�A8�t�pY 3��I��%�NAys7�M����o/~�j3t+�B�Cy�9����Q����H�D�B�"��)�D%YD��a���'T+$� �[����h��C���!�v���qӹ���1�K��P�P�	ԀYVdx�Vh'B��f @Ը�a���^��J��p����*e���N�����W��ˍIEX�V@�aAZ��Q�@�ؾ&RW�;��/\���Y��s�������w���>MD8A8�'���b�!J�2&���iY�Tځ"5�{�0�P��F�{����t� m嚗&m��MXAX�V�Y�0��Mi�!J��e��(n\��7��>_�<c7Θ\�T-�6tS�N�pi��Q��Z�u�q��U�{���'P� 1p��Z�dnn<�+uiYT"DI|bo9?f\9��ܥ�)��'֠-wi:��&�3l<�DEDh�]�m5*.�C#n����+��hCY�˕���@�y7aa�S�!p����Q����]}��.λ�fE�eϰq��c\6���O�Ļ��f���.���T<����ڄ#�#Oሐ���,�Q��9��I�7���,?��a7췑C�+�fIup�7y}��6'b�'����h��Ѯ��b��駒Q���M�o�p�-(���{^)[�8o�_be�C5ԧa��~gT�FiX	����Mq��v���Y��CQ���+JU}�|�96(n�j��\�ns��"���LG�1܁�>���[�aE����5nj�⬈���l����4�k�=߁��i�*a-�5@�f��(.t|/�_%�EnG�ԥV�'mk(�V�F�<�+��Z�^-6�/a[�+�}�s5g��am����:�h����f/ώ�i�л����s����GԀ {gE����}��$�X!j�fV_?��	))�G
<�CH�6�!J�q%�I�V�?o��19�G.�F�R��d��ܼE�H��>k��u���y���� 2��)�w2D�,V�;��ˇߐ킰♬��p)�F2D� �B+ޱ�|�R_N<�`X�r��d�'>�E�W��!{���x� ��)m�H�(b�9��{�󯙎C�@��L.�dIS<S�%������a�/��C�'grA�O9��Q����Vډ����bH�&5�G>>���Q#�dO;@�x;���B�qv<�<ǰJZ�Q��'� v$G�<�>Hv��B��|;x�dWKhz��j�a |�=>�IHXBX��(2���[%B���6B����#|��.��be��wr��;^�=�O�D���$
�|Q�q�vG|_�4�*[���:�ʾ���i؋�����[�a ��ޱ�:M�Wh�s+st��GId���)�����B�V?X去+ێb���qtl�Y ����}�e�B�`
�u�\���7�P����z���ŃDG/�.�R�n,�-~�:��b:�V����b���iجvN����á��۾0j��JMZ��p�(6Ǿ����8j�w��j��}����<�݆ݙ��p�����LjN�4���v�nћ=[C���/O�-���H�x�R�I���2�WG�uTCN�@�:���>$���f�E�`��������5v���0��+�<��$�xx�B����R�Ê�̧LI�(ĦB��L���S��)<;ϙʲbm���#Dr-S';��s��I�$�$S���g�Rl��!�TOr~�IH��?�s�X�/*1ނ��xi�}�R`����C0�@x���f�\��w��2�:q�Cd� �x?`�-O;�Q
����-ܿv!ʼ�̯kG..�<�1���J�(E�������{�g�݁0�9��
�<�s�1v
��w
��}�	T��y�����O� 0Bڄ�d�R����v���ǟ���v	�os��0�)�@b���nM�(E�=��{�d� �+��
|�*��eJ�(E����X�K�����C��HX@X�,xF��   ��D�,� ��>�Ϝ�O(A(q�{�2ϥ�.HD!@l �� 	==ޒ aB��v�D�C@�2�0�d-����˟~�߿����O�/�������F��У���?cq7m���������Z;��Kw��y5p��N^Us�\.�G��gEݹ�oJ� \�5���f2�Է� _�]�Te���,�������{9l��qjb�h� 8��Z���[�ݞ������g�cU�7��{�v�۵J'��>\��#���JUݫ��j\�.ڵ�;r�
����6�j%ۚ�A��r��̴�u�#`;�Z�e��SQm�;E�-�轛�>���!�s�3���++���������T�K�Wj;������w��B��ZA����,, ��y5:�p��"�vk����l2*�Bu��I�<�������;��<SE���p��I�4P�-ټ��on.zQ @l_��ݫ�����&�&��qY��+ ��u�Y<��-��{g�%%�R��,/��"�o!zɌt`�ZJ��}@�d�ΐ��M���g�����T��J�8Ye���e�WY��  e��RT�eY��H2Jl�k�ʓ��`�{�W�����*���H����(+x����?��_�%��"8&8��N������) ".��;g�"�n	P�1��WU��ҳ[���}�#�ԧUJU�Y��Y2���-�3
8�؏��qF`L`�ŉ'�)ڼ�P���Y�2��	@"�-��%���Ik��x&Ϛ,KX���\P|����gx�w���߸������i�W9�CF.FFT��4����zIL�PqH~m��� ����2қ�o!��K)�=�`���X�ĈRʮ��.E�,�
YL	P�q1���@>m1q_
Pg�%�)��w-���n������bJ���� � ��2x>'�1�p�L*����8-p*d�xnJ�#Q���~5T���c{��Y�� �O	D�����?����)']֐`�`��0�0��VC)xX�垹`(�����      0      x��}�n�J���̇s�O�8
��<���8K��A�S�C�aI�d���S�meW#PF��-�yRkE�׊L�)q�Fd�6�w�m��'Ƿ�0
�TKbR�u�v,�|MU�I����y�Έ�d�jl���Il�;��!4"��5�GI(�I�O�{��j�� tbJ���V��T���'id��iQaiJ�8���fq��2"�	����ޠ�iF���Nd���Ûx��۟���t�[;�GY���P5-H����G��;��`$N%Y����:�����Û�6��d��ϡ�Q_��Qz������/{lҡ<	N��/���jP��<�����0���k��z��;ˬw�CT{FgЩ������/�%���f�w���l���//Mq�-��ْ}^��)<�5Җz�ő�3���7Y��~��a�:��s]��6&��x
�+�^\��%ۃ��'��t�tƓ�`5��is�W�9Z1w����,+r���m�g��k�\o���m=��������b���4{z������v�ܧ�{.�����r�ES�Fm����vc?e[�]��><SCo*���?�|�:��j�Qbi��ɰ?Y�d�~ i񉗞h�d���/B��J϶�&��0��4�R7\'�^�IS��?3�'z�}�st��֚� &R|�I���ș��[��?J<�:��wB�)A��~��+�"U�ڤ��;���H���F����1{��m f�:IL�e���	���5𢎑�8��2%q�H��pȕN��#J�9Qi��m��&�3@���~�`H'&�:����n`:��@���N���{
/���	{��(��
`�BI�WmÈ��A�x��R�==I���d�	��1d2�<�pC3ua����d�{໎o�� u��c�+�9�����!�$� �s9{�j[�B�)J�cC��� mG���C�~)G�DE�:$5�-�`�v�o9�S�X�!�d ����}U�aΐ�7�1�#(KI?M������mh� M���Sc/�"[���u'��cc��.H���.�!��v;�C;��8������Ad����A���Y��k�"C7�%�$M�s QG�m|��c�c�+ҕ'Z�X�)@z.D(%�(.+�rY˹������h���qOݞ�4��!��+O� @�k#I�Vvǲ� �?$9?J,�<��wb>Q��
1�x�H��S������>�<� �v�����p�
E>;Y(q����6f�ry?��ɷ�ר��zN�8A)�5D ��$s��,�b�K_u��6Z��LOB�+��q��՞"��$KiN��_�����Z��Ҝ
|��H77C��'��"ϯ��=�,��J���&�gWe����U��Rk߅����V�7��(�W�a5Zf=O�k8+7��w�Sv�t^X��V�4'4���Wϼurz�{��?-�˕�@P�F�xn�Z�w�`����f�-���zo�+�r�7�u�������n
4iH�\s�*?���=i�_��4�Kx@趻]Ϋ��?SC[�(J\c��tnL$~i�G��L���3�η�$l��-})�5�_��]�L����x%���&��/G��f/�,�4
����x�X��\�Zr����9ҥ'�}bd��o<ކ�����چ\]7"�=g�����b|�S�����ޛ�� ��!j�S��?�Qw�|>@0��USA�&��sjT3u�ۓY�<���x �&�?� �0�0�y���b�_C�DU�PTEiM.7,+&�F֚�T���٪oQ���:��u�L59�?����K5�R�~m����MS�R�\�`Ē���Ug��ۈְ��T��dS9���hYgRwb�n�;���  �@$/ ����"�'0�1�~V�$I.�5D0�'�/h�Ć	d.�n��.i�qDf+�VU��ڐI�6��)�x���G|rk��$��M�|ff����n.h�	,�ga�<�Su�ܨ^���,��P���߲��D�u,�:���CV�"�!��E�bJ���4�!��K2@����+���4�`�c��wV���ve.D0JIAx/4��>�x���<T�f �P-��o�ib���5��9�tq.��Ł!݇�� ��1,�Y���!�D�F6�Ά�b �<d(�_�M��$�M�u�%�(����Ｆgq�@�\�"M�t\ܲ�����;;�m�`dG�o���?C(t��P�L����Q�^�c'N2���Pk��ه?:�q�����O�L1|�s!�eKLI��I�a�Ϊ�8PC2�ׅ5�r�-�Vd���[��i@��8�/3Aٿo�I-�N�՘~�q�v�{��S?0���Z\�[���CN�N�������]����N�z�,��K	��K�)r�ێ�t6]%7���T��w&]f�vv"g���!�Bd�T�M�\���ĕ�fUb�U�n�I��3a��Z�P��k~��t��5	|-���~,v�v(���i��\���/��&�a�)��.�_�"ӳ�7���|P���tiF��^GO�}�6[��e���U���]iq�h�d��Gu OEa�Sq�e����p�}������m��8N�|���U�3/��I��y��o�/��!�� ~{�yb ��
��|�`�!o�Ơ0��2��Ţ��\� ׆�7w�R�|v$��U�.����G���v�/>�9�9�@i��K>D�ȩ \�
h�7��zx$w~�A	=���|?��$zndhG�EN51"GE;�(��A;�M���������g(�H�ʇx)��'��p�>& �H��i�v�余O�>��b��ё�c����H��)���`�>��0E�υ��Olȫ����}CzިC�StTm���|&���D�Nd��A=��0�1��{��X����"�V��o����o�_ϐ��G�����3F�Ot��}LL��i�Rz�(�υi�B���V�̐����V��"w��<����4��?�e��Ax���y��܆ɻ�'�n�N�R��5���(��P2����;��z�]��d�dx8���E^�|��2�W��y3��ž�y�2�tt~%6r��S�*��1>N�}��ϱ��,�й\&�
�2/��āM p�s�s64�u��WB����'W�Bv�q����?�C>�P|��3"8�İ%��R��qv+�+�7�+�{��t�CeyL����Zd��:됞��빖�ٯ_I��7t���U��޾�5�h�u��L�Ѵ�ײ��lZC��_�-���vW�	�Z9�f'��{֋�M��9��x��;�e���`"�/�H���*�T}{-�Q�Sz23��mXU?������eG�'�қ�����*���i_{m:{~qE�k����ڦ�?����,D�i��I�ҞLFED��A����VV��͵�K��Z�����q}���?���p��I�;�q��lhN#q���Q�߽��~�>M3��qN蟠Q��G�|�l'�T_j��?�{.>�пc�ne�������,����hfS����W�G3 �)Z��!��J�^p^�0����y�7[�a�Gޟc.�_���q���E^�}S���ϝ���V7�̃B 3����"8�����J��Ւ�t�Od��ҋ�u���h�Y�I��ú*������Fu�<���c^A~�)Z�s!�J١�ipD��%��}����:(���\V��ԑk��ک;��0�8����-��X����ȱ�������J�������A���x��Q�:=o�H����ԃ�3�����NA���7!8��H@�Q� c~��{��o��{>х�7��� �{	 Ш���]���%F
��	�{�Uɳ���8�����cc��Cd?��)%FAI~�n��������{)��E���(�� P�T`�ɇ��(P�xktf��꿜`�ϥʔޛ�T��gG�.�nf�� ��#���<1Ե���!�gJ,�������ժ����Ka7    b�/K�_9K�����Sd�̇>u�Ǌ�_z��������+GZ���lκ�J9�������h������k	�QG�B��U�!|�}v��'ʳ����$�_,�9�gב�`����7�I;���t�d�_�q��*�{������©lu��`J�;6{�X����Ө�J4�e�ux}U�+��6v�����`�О5'�wc.Чt�j`sE*3��i�v�j�/�J0^W;���$�Ƶ�r��n��B�ǲ���"wB�N:�ߨ��� �4�su�x��G��dV�d�Yi����aѰ��j^��'YEn�r����_;��X��0`rT�R�q!����<1<%�w�xoC�����.���gT�J��p|&�J�v{���W(��SwoC�������_z?F:Fz�V����|&�J�K�����#���}?��6D��+=^��,�,xx��;7�m��3�W�7z1�1�a�<�<���n"�)�ҿ�ҋ9�9� L�ҟB&�J�Vb/=�g���"��m�2�Wz�ދ)�)�
4Ű���!�|��$�=|�.�E9�:Ջf�� ��1NT��%����I���ȋv�=����u�H��`g�R��bB���AcՑ�9�v���?Iv�V�Z��ëѤ����]nU_l&��[	�,W�ju�r{�[=%�65�Q��6s}�����a�,���3xn1��خ����4��EK�_�� ��3�dL��b���Q\Wڳz�)9�]���cԨE�Exl���C�>�{W��u3]�řUE.���v����w��?���H��)'����v��;C��;U��v�>m��p�'��>��g�g�v�3:�?>ػ�s��W�v$��^��ZQ��B�B3їm?R����V�$��.&�s��~��v9�g��n�惘 d��l;�/.V��8���)�hcȇ!���;Q"��(٫����n�6d?��m3?��$�<Oĉ�a��n����N�-(�#�x���ԗZ�0#0#~��lv?Mߝ��B�˷j0��������l�s��g;Hc�b���}�hγa�� m%h⡧n�N�:�k�u�S��`��L)���S������1-0-~IV�X���!dj��A-�|����G`���.9��ag��#
m-�$	�n�.~	�-T��e.n�]'F�t�vQLL�_��g)I�� w"�LH����:�R���.J��ZV/��R6.WHA"��]���H��@��	�M<4l���o�T�{Rq����@2"��E�C.D��,+�hc 0�����c9	R��� �j���b���-4��$Ȅ���@iՇ)�Pb�� ��a,�YZR���\�2%Y.P�Q���M���)�}8��Y9��<�z�FY~�������+.v
��D��j7���d�+u>D��,�I�h;�T-���Qu x?vv���|ۣsB�����U_;������R�y.�5T?q���い��� ��!f"����|s�`�� #�A���n���ocȟ\=[�����^�,��Q�a���� Mb\/c<���
���\�3�Y���|�7,�T��� �����D{����m°g�橣d���%�nf��j��PA���KLL��у�(�)�r!BdK,[RJ��0���Z�ǉ�_��c��F�Ќ��|��ٰ�D��r>Y�|�O�vX��*Vu�(C�p��E}�n�lEd��>�Wj���"V���p�1{�c�9I����\�<o���i�a&��-4�� ǪQ��3Gթlu��b8� ��RGaN�<���xܶ����"��4�Ƕ:z}�3�P��q��T~̅�<>U��5�;�17��_���L�q�%���#�Ay�Jf���{l��*@����^������Q��UG�COi���:��ɐ��Fbd�˻��n��i_�ޡB�٨'��k��A�� ��u6kLk��3394�	�Z�օ
5H@�
�4�m�x4v�V
��|�!��jI�lx�
�����*p%ٴ�!B�K,T�\/L����r���s�u��r4���C�!p'�M�!
%x�r�,Mu��G���ti�̆�A@'���@g>D�b��P��!������ף1	0	BN���J:"D��J@���$),����7�����>�P��gˇQ.�2@�9!�3&u��4���� ���)J��#����������!i������J4���C��*�	�!B�K�E��	�8Ҝ��M"4f f�C�� L�ʇ�)q0`:>�Zq��9c6`6<���Pt�c;"$��!�y�j�s�DC'����za�/�^$�N�RH��f��@֏z�?�:������9ؐ��M�p��2)�F;�f�*=�gD@a�>Ε07�V�d�n"�m���w֟�V�����Ń�BEA.� �l���3M��,)P��}��/PG�db@�La�H�p�l��G���A��9J.����I}�N��,x0���E)�m�z��%;�2��f3P�<G�L]�Kom*4_�}�@����
��qC]+�^]u�(o+*|�+"�'f�V��C��WNc�9U�~�<�Ou����zJԋ��<�ůL�1�2��J��j���� 6W:�&�2�_�C4��C�[�5�?�-%��#n��Þ4��<�V&��5��/��hY��ڶ���iɝ���f�"+�3c�cf�*�x���pMAxU7�G�ӆ�U����~muZ�D�Iڣ=?�'�]5�v��2c:^�/�n���- [tq	�CES-�&�\+VD�:9ͽu"n����Ӫu���@����dZ4�U�p����u�������E�3��w�=�/����QK��}��?g����O�@�ҝ�p"$Y���^%��� ��]��NP6��s;�0!˚K9��Ya#�썮-�����D�&LL�劉�D�}Wr�DID�% �Ž��xD6��{7)!Y6�0��tȣ2��\T��s��N��& ��_~�2�
�J1UX�b�;��6DHr2Y�kV&��dfXdg��72���X:gYy�"ۤ��`N�0E0EAN���{"$ٛ�"���s����6���w����Fg�� ��"/��͙�v�:�9�>dWA��s⡜XJ��S�k���vN�e����gӻtG��7��zvr��{��.��@$��5d;��0�hT���S�۩���t��l�!���(�C�.�w�S�r���O?ng�R�]��o���tyB0)0)A
F�Ļ�u7Bf�-
(�K_T3�����'?�����/�>oި��U���
*�8p���q�̏G���(V��:nC��"�0��(U��$�6��1:���Tס��5qs��3Y��c�E��s��GY�hN���RS��@��x7��6D�2P5nT��Tv�i@i�:[�A� ��⢺$]h����؎��6��t~�~�����C�'������!B摃
��3�$o��Ne�<���)53K��Am�M�؅=����LDD��Oǌ��x #X���a��!�7���0N�LS��CGT�8��d2Ff��P�6
 �\S�4�0\a`���p"%2w���!����)2S�_{Ro�=��{��|�6����|!X�qA[Խ�h�O�aw��5i���êE:��f����1R=Ty�6��S0>��C��y�joR����%:J"��5Nef�jMO*/۝�����+�X���ﹽ*�=n[����#�����4@��I����p;^�H���"�,Fi썠�X�+z���\s������Rf�e�kO��F�U��aT�{�0�f[2�i65k�E�Ӹ�;�����Z����bO����NVǠ�_�Z����?�U^��`�dv���㱧A��*�����z���׬�������MZ��f´V�r����|H�¬ȉ�NA)�t?��6D�Rf�b��qj9.�l$Կb�ڤP�G�渷I��O�[��cF`F|##�1<�@�ˇY��Ŗn���(��I1�
ާ;e���fS��j���k[�·��im�]�p=� ,  n�L�L�N&�,��=���Y��_Y��q�S~�J���B<�l���t�����d�itO.��C�Bg�'��iZ`wR�n\�Ȋ�BՌn^w=�y��Ӑ��|q���N7nY�7`:<�,l J1�!Ba2����T��뤾Y���K�sV'����I�O���7�!3D���ɀ��d�8Ja��p
�9����pr��#tTC!��7���t����}��[�o
���/P�R�R͇��lM̿`k:
����f>e����|�x�� �oP#*�D~��M����
A�8��Ś
�Y����t6����m�S�!޽������q�ZBW���	a��0�PD����o���o�ݲ�W��hi�ٽD}�{	���{��
�tW�!B3��}K���O��'td=���� �
:3c��"�ҍs	���;���Es1oC�"e�%�K=K9��Q��Ԩ��L��%/SJa=��\bJl��M�w[�
\:��?Y*��,�jUm�6+��PQ� M�VT��,�+��f�t��&=ɟ&&��i%Ӗ�jL�͇�mK����F�s7���wχmy��^���mt�a?��uǄ`b�^�ͪwli�֗�!q��.ʻ~���6�6�ŜeŎ��������^T���,���d:�T]öeO3R'viv4[9���d�c��7�쩦�Ú1�ux�^��xZ���7\�U1�Q���Btb�z]jE�����Q]4����nhiU�e�WIp]9T����v�fY��3g��{�2oT�jk���ac�v�7]���R+�'�KI���eY���w��Y��:MD�uLCC��!*p�"�&I�O4� *��ZQ>"t��-##���s�����\Q�#D��9b�b�~7B�[:��M�!����814��{m�:�(���c��(�.ZE3���$��N��|88Y��>�!�b���Dgj���1�1�����VC< ��/��j�x�Q���F'�>���9�k���N�����di�d�x��(�<�PA�""��      2   U  x���Ms��ϋ_�7O����Œ��VYE:NU*��W	 �п>ݳ�;ӳ\@��r����ӟ3P�0�P�+����v���z�j����]Q��ժ�o���v�۬�O���^��������Cy��6���e����٪�}�������y��uR�Br���[iJ��ZυdVW�jLZΔ.l!t��6�E�.�o��bW^���B���]�z(_�_��4D�G�^x��97�UN�|	�����Y�����kS�������Bk���js?�UBH��	����YK � �Hh����޵�� kֻ��N����1�	�$�s����?5�}{S��j�����3�2f��1s.�Ӛ`�K���C��n��ߗW�]�x =��3��T$�Q�
+��u�m�O������k�lW�m�f�l?	���v����r�9�I��}S^��p�f�3���ͅa��}i9s���x����uy��Ϭ�]*����uE��������3�C/���16B�h(]1�cI˙Dy���'B
h�7M���z[�^��?n��n���}��9k��*E�s��WZ_Z�*@�_W͢J����^���������q
�=y���87�k�r&8�	<�����j�G�-��_�u�|���r��.{>�B�yp'Z.Ese��(��h��}��w�zU�>{���G�^��ϛ��h���ժ����A�R��t}	�$�I��_����}�*�5�b�Ǯ�
�}�7߄�����M����0�<�ٗ S!��Ƞ�c�3���~�.����&�6��"��,̴��ؗ�������Z�]�6]4��]���V;䐮���:�B�5DH@�������N���`���C�(�7���r�g/a�٘�����������v�����S���ZD��y���+�� �AN�����QvVL�Xr�aLx"@pb���%���%��H~�Q�@8�ƇX��	�*��_Q��$�X~�j�.�q
�/-gгh,.)���K+��y�ѓjnS���	D˗���J��`i��:�I��
B�JR�	�c*(���iI��/(V��!�B)Z¨k�!]ݗ�4f���@S#�3�i���$���@���a��^"P�Kʂ�� �K f3RDN���Va�2�0H@�B�5��h�<�,a6>��4L7	=���U�l��T?�7�՗ ��
LU�N�Ze��9�,ǉ�` �D�q��q"�
�'fl�~h��C7�`�8���t�fߋW}��%�+���c�P;��|
�$X�j� ����ʬ3^DGg:�C#��Q%	%��{R��{0[y�.>:�B���a8�ilDbJ��Q;��W��|�B��N3����=��\2�G bF�I�M!�)�������x�aq��ַ5Е�Sʬ!q��̛d�I@��>�·���{�	�p�&xő9F`��(N;@8�˂2��&n���?
z��S�� ��3���A���0�����e?�8	t4���A��������p�9 }��'#	"V��
�R�㐰@A������RF+������4���rf5�G��C�o��@�hw�9���Xa���,^uh�ϕ\�0���i3��{�m|m ��ٺ�Ka�g�Gǥ��3�}F����.����XG+&�۷H�av	�p�ɀ�.���JR��JF�H>�+���Q'C���$�<�e�U�( 	�p��x�FƒI�<�5���S��K��s�D&|�W��m�*�u�����i�:�{���	 -�zsA7n��tZ3�� �t�����JcC(CvK�S	a�p��p �GB��I�KƆ�!b��v0�U$a_�
se��8�}����@�������bNtqf��Cw%�� {
�	��NczH��d�%������	:z���rn�ԡ;��t_:����NM5Y����K
�/#Κ0p*r�T�I<O�X�W/�e$#��$�4��ެ�H��]����~��Z��4?�
��&ݴE�����馁�{�N«pu )Y��ɑx�>"lS_�y�mz�ę����S	ŜCW��o� �G>wl�r�p<N��V)��("�ё�����﶐�	;����MI���+ɒː���9\X�*�
9��9�a�d�Qs!�H_�D�b_��1��l�?7���d����݈��z���аG	`q��D�!O#�eQa*��K�|D���<r0+���4�dN��b=Nz9mn�
`bW8��[�TvOwv�ȘYc�i�V�HJL������y��	��%������pbfW�����v�k�@����|ȣըX$%�w�we�5��`ڌ1ϓ�+|p���ʑ��y��>��-iLu<m��������̉�(8�%A$������Y��D1�^-G��@����T�PQ��@����ܙA}.5�i�I��\�s lxע��H�&A����7�SQ-� �ڗ 5ܤ*\0gk��k�X�|��c�HZ���5Q�l6��\qVY��/���i������:�Y��e+��i ����~Ԙ#͓���
4��3]�D�V�~<"��-�9^F�Z��k���K�Y
��71�1�e��L72�T*��E�u~ A�VT.��y>�����
��K^�>^j滋������7pCV�u�s[߁���ダ�-f5��ZA��x��2���ᑹ��;ƴ'�X' �>b�頸������I�2�o�$=	H�si*�W��(I	8���|G�7�錆3n�
?�����v�tc�b7��y�/���*δ"�r�AG8�e闬�
P�@���.R��o1�W�h��VH*��"ׁdҒ;٘äҔ5�~)��\�q�(�Kdf���HBF�+�i������L	�Z$�%HbrO�N��3F��ԁ�K����>G������P{������H���ˁL2�:��|�@q AT�q=��L�>�%�E�h�3咷6����-P�z�m���W�9�5E��^��h]�&���~�� �ם8|�����P��On'��5����Z>��ܳ�-E8~�k�ϥ��N���w��74��3ދ�:��3�����^o�wmyf��%�����a�LDoO��c������f���"WN      4      x���n�j�������9l�9ḧ9�Y�D0`&�(1\�O�\=�w����
u�C�b���{����~:�q�$5Y��4�Ӹ}�;���<�M��w(�;�=������.�s�M{A�8�`-��@#�.��'��t�<��2~J��ah�ח�~h:?�iӤe�y���O��?z��0v���p�۶o��m�6�������íM����1��&y~o;�򺏊?B��N�@��w���!���G�~6c�v��`�v�S�O�Q' �+Ok�������q�_��m�F-��%Ȃ��x��񂺗Zx�%�fu.��0��S��*�? ���3c�锰]�Ώ4a%p�XL�%U��ɓ�Z�.PJ�s�N�v'lm�M9�6?j	fU��ɾB����F�_��Ck0
.�@~�b2��jXsPۦ�i�yS��Yz\JB��b����Q�A2LE��Z�qI��;����MDZr$���#υy��a%p�mI�vնoL]������Q�I�_G���QŶ���Ѷj/�u��t¢�a�#��Ha�q�����b�f��F@� ����^A�%$F�' �_���B�+
`�B��;�~?YU>doTC�S� �ի�ю1ҽ$�	�]��"�]�e��#����L1
(�I?qq����~��og����l?�|� ��� a.�y���l*W!EV�94�n�����ݗ�15�w-�,���	I��>��A��@��*�*��#GCWe�FH��A���$1�����v�VNZ�}r���s;?�Nb�v˘��ꐁ���-P�C.�����ի�6`%("�*�qop��H#�H13Sܾ�4��u[�ʢ,������̗H�g �:�cG��Y�ռ� ���̖����֑�.�+�&����8ռvqn#d��9�HM0B��5�&\I�UogI��H�o:���F_�c�_��_A��	�p�_�>�����@ox���m��!�(Jٍh����k�A�`T��X��l_.ϟؙ7�����EB�9��~�� ?�m���x�Nh �j4���:�,0�8~�(�<.;!�p�R�tJ���`�{`3o��q����ހZ2e����f<bLiw�U�Q�L.;�+|Ly� o�d�ະQ;��B=�L-�|ɹA�t(���1O=&Y���uW�е&���8���Ca[Ɛ�a���6�3Bh�;����פs�)�W��$Bc_^I8�U`'R<�K�,���:������E�z��j9��m�h:�~Ȃ:��o�("�8#���20tU�h���M��b���o��oҍ}����ryb�G޿��|�QTK<<V��T&�X��->�3q�G�Q��^*�"+ͷ
�h��$�_ә6�~4n{-�#�9>���ʿ��9G��u���zy����2/���kY_���H*�è?l�^��N^c���ұ�hh��,�ʎ�H� u�Ó�K�#r���~�|Ĭ���������j|dPO̝�'p;0�#�"[	,&�Dp���L�M�MӉ)_�Lڑ�7�u�A��D6VM����#�?5�˧��7#BJ5g}��5�f�c^xϺqz����TmH��u?m�i��qda^���}=����~{� ȪM�鹶���Gd�8#�=��
Cr�+����ů�NyYn�w����F� ���w��dr��l;���Z\?�>g1Ĉ��^^�&����k�v��帧���2O�4oV��\�%&ǴT�%�r�ab(\�~�d���t��-��5vdaB��]B=ao�Ri87� S���ER;P� �VhP1���sYo-"������Q�j���O)�b�Y��-ƕ���Ѷ=�ɀ.����J��΅n�w�À���m�p���R
?���m���}tM��hId`������ZLt�_5�sO���a�c;HG;���~�� ଳ�+3��@�Ӧ`"�)Ģ�r��R�Ky�����~%Ĩ�N�:�%i�F���!����l�us�y@�7GB���Y\>�Y>|I#��ٮ��&����RWx�D��:Q\I�C:-�k��GX@��_"���s��I������f=Z�<g�{���ր#���Lc�=:Ak>]�>!�H��#~c*�ٝ�s��E�T�E�hI�� "�S~���~�v�~	@��!Ԯml��pv�~O&��gI�����aT9�+`�8�;;�"4?�ټ�B����Θ�һ�le?f��OL�f�Ҏ¾��{vݨ�l�����G��@�VI������/�U�»2��!�˶>5e��+*Ү�����_ź#�)�޶R�����`|D�.�ٱ�l�~h?�nz����_��W = �N~!���|#���]����2\`�j�Լ![���7H����$�/6�N��
�G�q��~�|C�o#�M��<?&��<�q��l^{t���
+$a�Ji$5��~k�����q$�et>Q�s�6�^��F�j�a�q�ys��(�ae����r�H���Y���3��I������-��SCc�Y��p��;v���1=	v!���z#�����-GF�k��p��JUBjf�l��&�S�,�Q:LQ�`����|����2�b���)�h�͟���iVH+�������u{qGf�Q��D+q5S������pB���KO�H���Y�d��9s�		���m9 �l��+B�73�_������Of���)���^p��9 <O�:ֹf��.��	a/$s��XT��2Q{�~����o? '�ű\���_OW!l'/^A�W��Zo�*�v��hec)8�
�)}g����t�� �Nɕ0ȁ;c���]z�Gs��ٶ�Y��>�X��5��D��tv��BtM��z6�@��H!9~�X���N4^�4]l?@;��[����(z�o۟����%s_�:�}b�ձ1D}B4X^���qe� zϿ�2�D��.v���F�~2�E-Ӟ�B�\�U0`����S3I#_�A�	^�L�؄�=���]ܥN��0�@��*]���Wy�Q6	��Ȧ��_�&�<s�� �fL@����+?	~׽g���X����h��C�q��QXlK���T��zphpq�_	?�t����R	�۠������d��.�r�����h���.J��>R2vO���(�L'JeЊy���|�vK­Gм���#�&Js�i̓�j���,^�ThP^n`�Oʩ�Q��Ѱ��f�{SQ�ݒ�Fh�3z����uF8In��#���}���erutA��nr9��wA[���Eγ~��=�̓��rp�J��Z����r>�ݏz4[Np�޴�k��ȕv�Uf��S
M_ D^�Q}��~$F�U���.Ľºsp&G��Yo�u������
��A^a� bߙm��v��oHC�忇�D����C@�{�7�9f�
�HU��d��<�8[./��G��g���eх_h@
'� Ɵ��SS��a����������C�س����+�m���Br:���(h�ij���� ���_�}K�{.�U���o'�6��Oc1x�� vV�$:+m6C�ɏ��9�]����.����j
����ð{vk�(�?v{�:�����l,!R��5W�L��	F]t�fL�8�!x�&gk�Hf���Y�s�ЩUl��2"�Gb/>����È���g�|��|񨈱zI[�wP�P��/^  �C]��{�1����_e��J��%��W�fO�HwȽm��&�C�F_a� �ȟ��.����!�+%�y�_ ��/�+���<�VL����EΓ��P�UO9�8�Iz�;
 e���t��n4�ZZO���_о�0T$f_9��Sy��c4���$�Kජ�U{Q�`��pn2�+���؍��Xl�U�R��7
B �X��WV��uf�Xܗ��
L7�C��ֶ|��bxK�n SuAo+j���C�qĺGfI(-����`�$`�%h��V�N��f�e������\���UD�R-I��'�|%«'�Ѳ�g��pMa��2N3!4�D J	  НN-=W>�9$����8���l:�F}�?�q+��h�{�����4):�t��9 B:�M8��[ȁ8�A������nD�~��7�g�y��w_i��OZ��,s�k/�����`Zh��߯7�QKY�.X9f6�J��d��������M�|oI���=��R6�䃖d?o
9�׫�1�KPGeք��b��4�ܩO8�(^N�A/�[��|��^�[�5��v���&��7!���6�>F~�%o?hC�j۴&(�9o8;�����:��K�Kpf��[uy.�XWmP?%�S��d�� v  �Ŀ	=���H�I7�M���<�~����G��ń�Sf���8��X�r���Xw�(	���R}J��d��&�;��#�M�$�V���k��E>�A��X:i�+��)�!/5If�x{��������?w\r�T�O��%��5�I�¿=��=�������?hAޢ����>#nc�LgK����|���˵�"�/7�=#�j�����S�?�'(6�"�>(�|z��ێ|��ݔ����?�:��0�t�v$�����Ndz�%�e�>Y�&���B~a{̠胎����O��E��"�$>p�߆�!��a��ԅ1��w�?�AjJEGP}I��|����Ӵ�$��d��z�n������i9s�A�?e�S��lï0q ���	=C��G+��2���ص������ֵ��KfgyvFs����"?���EȎ)�1!�n����)ܿF������oC���l�q�d�U��k}Ѓ�=є�>��G)
��v�Q��M�\/1��J*��	 ��η��l�n�[�6��7��t���3�ރ��x��V�.$��S̧!EB�Z�������Qp��ʺe�̟�WOӕ!%^���O��5��?��	3��߄���.��߭��w_k��mH.�,}BAh=�Q	3HF�%���5�
\c��C��/Nm(9�)ٟ��3$��}І�6�a_�ꝿH6}�rW6�AҹLg��h3+�>>�x=9��z:2��7�W��N��n�3o����O��Ǜ��P�C��z��ې��O��� Bt!� )�lV��
ުe�z�o�4͇��*�������B���T�k�&6l ���y��{�����d�U�|��6d|���O�daJ��j�1sn�j�x1~�2�p�΋����S�?��(6�
B��2�M�zoC
q�-OT�4�;��!G�b���1 ��<
5��1�땼S��pnGG*S������O���M��F���M�~�C��?�E>hB�L��G/T�1���k��$��Ju��br�\Nېo.��Y�T�_���
!��	�m�~oB��?O���w �:�}h"�yf����G�����.2���1	R���gR�O�T.��)؟��{��(�]%{O_!l��-g��>9v{a�OO��t �+}o�E;�`��D�X/�t�M�/Uc�a�^$��	�O�
����4�}���c�t\�1x6���������l�({[�=��	2T]�_�M����cς�����X�{ub��Lg��T����?��6�_��ֿi������nW�LB)�o��44�������t�r��T��Dl�h� �ό�A���qpyk�x�s�yN�����J���o.�R���� 6�w��<eª��mfw��8����M��0	{���_�C_UtQ��`<(�����>�W�c�k2 鶗W���n�[/�x�����
�1�J�3�)ct�B1F��҂����"��&�nS�Ņ�5�U�K��'E����lӐ�.�|�z�G叫�br�u1�s}H�̻�9:�����Z��Y�M�_Q� ��� n�_A� �������/x�~�����NO�:��M裟�X�~G�O�Eε��Pr�1p���#�`���d�e1�:Y楎���\���iAT$H���u�y��2�j2��2`Z4ꑵG��T^����hX��P]jw�l�x��8�e�&uef����V��ݎ���i�Q�w7q��@D�Xu���%����f�~��	�X���ۚ��!xίcҝr�d��������d6��Ze�v�V�>cʆb�O"ܔ��y���O)ԃ�9rwl�/�&Z9��'g1���S�pʈ^����l�W�a�� �L�A\]�&��ղv�?�l�'����_���`�^���g�{��o����)����u5af��}z�(j�k5L9}�S^4��ɔ�$�m@�;���O?+c�t����ez�����;=��������_��     