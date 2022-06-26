import { CheckCircle, Lock } from 'phosphor-react';
import { isPast, format } from 'date-fns';
import ptBR from 'date-fns/locale/pt-BR';
import classNames from 'classnames';

import { Link, useParams } from 'react-router-dom';

interface LessonProps {
  title: string;
  slug: string;
  availableAt: Date;
  type: 'live' | 'class';
}

export function Lesson({
  title, availableAt, slug, type,
}: LessonProps) {
  const { slug: currentSlug } = useParams<{ slug: string }>();

  const isLessonAvailable = isPast(availableAt);
  const availableAtFormatted = format(availableAt, "EEEE' • 'd' de 'MMMM' • 'k'h'mm", { locale: ptBR });

  const isActiveLesson = slug === currentSlug;

  return (
    <Link
      className={`group ${!isLessonAvailable && 'hover:cursor-not-allowed'}`}
      to={isLessonAvailable ? `/event/lesson/${slug}` : ''}
    >
      <span
        className="text-gray-300"
      >
        {availableAtFormatted}
      </span>
      <div
        className={classNames(
          'rounded border border-gray-500 p-4 mt-2',
          {
            'group-hover:border-green-500': isLessonAvailable,
            'bg-green-500': isActiveLesson,
          },
        )}
      >
        <header
          className="flex items-center justify-between"
        >
          {isLessonAvailable ? (
            <span
              className={classNames('text-sm text-blue-500 font-medium flex items-center gap-2', {
                'text-white': isActiveLesson,
              })}
            >
              <CheckCircle size={20} />
              Conteúdo Liberado
            </span>
          ) : (
            <span
              className="text-sm text-orange-500 font-medium flex items-center gap-2"
            >
              <Lock size={20} />
              Em breve
            </span>
          )}
          <span
            className={classNames('text-xs rounded py-[0.125rem] px-2 text-white border border-green-300 font-bold', {
              'border-white': isActiveLesson,
            })}
          >
            {type === 'live' ? 'AO VIVO' : 'AULA PRÁTICA'}
          </span>
        </header>
        <strong
          className={classNames('mt-5 block', {
            'text-white': isActiveLesson,
            'text-gray-200': !isActiveLesson,
          })}
        >
          {title}
        </strong>
      </div>
    </Link>
  );
}
