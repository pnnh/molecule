#ifndef VORONOI_H
#define VORONOI_H

#include <QObject>

class Voronoi : public QObject {
 Q_OBJECT
 public:
  explicit Voronoi(QObject *parent = nullptr);

  Q_INVOKABLE QString random(QString text, int length, bool symbol);

 signals:

 private:
  const std::string charsNumber = "0123456789";
  const std::string charsLetter = "abcdefghijklmnopqrstuvwxyz";
  const std::string charsUppercaseLetter = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
  const std::string charsSymbol = "~!@#$%^&*()_+=-[]}{;:,<>?/.";
};

#endif // VORONOI_H
