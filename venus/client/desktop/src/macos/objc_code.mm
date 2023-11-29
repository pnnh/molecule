#include <QString>
#include <Foundation/NSHost.h>

QString localizedHostName()
{
  return QString::fromNSString(NSHost.currentHost.localizedName);
}