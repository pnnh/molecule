#include <stdio.h>
#include <stdlib.h>
#include <unistd.h>
#include <openssl/opensslv.h>
#include <openssl/crypto.h>

int main() {

	printf("OPENSSL_VERSION_NUMBER:\n\t\t\t0x%x\n", OPENSSL_VERSION_NUMBER);
	printf("OPENSSL_VERSION_TEXT:\n\t\t\t%s\n", OPENSSL_VERSION_TEXT);
#if !defined(OPENSSL_VERSION_NUMBER) || OPENSSL_VERSION_NUMBER < 0x10100000L
	printf("SSLeay:\n\t\t\t0x%x\n", SSLeay());
	printf("SSLeay_version(SSLEAY_VERSION):\n\t\t\t%s\n", SSLeay_version(SSLEAY_VERSION));
	printf("SSLeay_version(SSLEAY_CFLAGS):\n\t\t\t%s\n", SSLeay_version(SSLEAY_CFLAGS));
	printf("SSLeay_version(SSLEAY_BUILT_ON):\n\t\t\t%s\n", SSLeay_version(SSLEAY_BUILT_ON));
	printf("SSLeay_version(SSLEAY_PLATFORM):\n\t\t\t%s\n", SSLeay_version(SSLEAY_PLATFORM));
	printf("SSLeay_version(SSLEAY_DIR):\n\t\t\t%s\n", SSLeay_version(SSLEAY_DIR));
#else
	printf("OpenSSL_version_num:\n\t\t\t0x%x\n", OpenSSL_version_num());
	printf("OpenSSL_version(OPENSSL_VERSION):\n\t\t\t%s\n", OpenSSL_version(OPENSSL_VERSION));
	printf("OpenSSL_version(OPENSSL_CFLAGS):\n\t\t\t%s\n", OpenSSL_version(OPENSSL_CFLAGS));
	printf("OpenSSL_version(OPENSSL_BUILT_ON):\n\t\t\t%s\n", OpenSSL_version(OPENSSL_BUILT_ON));
	printf("OpenSSL_version(OPENSSL_PLATFORM):\n\t\t\t%s\n", OpenSSL_version(OPENSSL_PLATFORM));
	printf("OpenSSL_version(OPENSSL_DIR):\n\t\t\t%s\n", OpenSSL_version(OPENSSL_DIR));
	printf("OpenSSL_version(OPENSSL_ENGINES_DIR):\n\t\t\t%s\n", OpenSSL_version(OPENSSL_ENGINES_DIR));
#endif

    return 0;
}