"use client";

import React, { useState, useEffect, useCallback } from "react";
import { useStreamingRollouts } from "../hooks/use-rollouts";
import { Rollout } from "../api/rollouts.type";
import { Typography } from "../components/typography";
import { CheckCircle, XCircle, Clock } from "lucide-react";

// Custom hook for managing streaming rollouts state
const useStreamingRolloutsState = (limit: number = 10) => {
  const [offset, setOffset] = useState(0);

  const { data: latestData } = useStreamingRollouts({
    limit: 10,
    offset,
  });

  useEffect(() => {
    const interval = setInterval(() => {
      setOffset((prev) => prev + 1);
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  return { rollouts: latestData?.rollouts.slice().reverse() || [] };
};

// Individual rollout card component
const RolloutCard = ({
  rollout,
  isNew,
  index,
}: {
  rollout: Rollout;
  isNew: boolean;
  index: number;
}) => {
  const formatTime = (dateString: string) => {
    return new Date(dateString).toLocaleTimeString("en-US", {
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
      hour12: false,
    });
  };

  return (
    <div
      className={`
        bg-white border border-gray-200 rounded-lg p-3 mb-2 transition-all duration-700 ease-out
        ${isNew ? "animate-fadeIn bg-blue-50 border-blue-300" : ""}
      `}
      style={{
        animationDelay: isNew ? "0ms" : `${index * 100}ms`,
        transform: isNew ? "translateY(0)" : "translateY(0)",
      }}
    >
      <div className="flex items-center justify-between mb-2">
        <div className="flex items-center space-x-2">
          <Typography.DMMonoSmall className="text-gray-500">
            #{rollout.id}
          </Typography.DMMonoSmall>
          {rollout.success ? (
            <CheckCircle className="w-3 h-3 text-green-500" />
          ) : (
            <XCircle className="w-3 h-3 text-red-500" />
          )}
        </div>
        <div className="flex items-center space-x-1">
          <Clock className="w-3 h-3 text-gray-400" />
          <Typography.DMMonoSmall className="text-gray-500 text-xs">
            {formatTime(rollout.createdAt)}
          </Typography.DMMonoSmall>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-2 text-xs">
        <div>
          <Typography.DMMonoSmall className="text-gray-500 uppercase mb-0.5 text-xs">
            UID
          </Typography.DMMonoSmall>
          <Typography.ParagraphHafferSmall className="font-mono text-xs">
            {rollout.uid}
          </Typography.ParagraphHafferSmall>
        </div>

        <div>
          <Typography.DMMonoSmall className="text-gray-500 uppercase mb-0.5 text-xs">
            Hotkey
          </Typography.DMMonoSmall>
          <Typography.ParagraphHafferSmall className="font-mono text-xs truncate">
            {rollout.hotkey}
          </Typography.ParagraphHafferSmall>
        </div>

        <div>
          <Typography.DMMonoSmall className="text-gray-500 uppercase mb-0.5 text-xs">
            Model
          </Typography.DMMonoSmall>
          <Typography.ParagraphHafferSmall className="text-xs truncate">
            {rollout.model}
          </Typography.ParagraphHafferSmall>
        </div>

        <div>
          <Typography.DMMonoSmall className="text-gray-500 uppercase mb-0.5 text-xs">
            Block
          </Typography.DMMonoSmall>
          <Typography.ParagraphHafferSmall className="text-xs">
            {rollout.block}
          </Typography.ParagraphHafferSmall>
        </div>
      </div>

      {rollout.score !== undefined && (
        <div className="mt-2 pt-2 border-t border-gray-100">
          <Typography.DMMonoSmall className="text-gray-500 uppercase mb-0.5 text-xs">
            Score
          </Typography.DMMonoSmall>
          <Typography.ParagraphHafferSmall className="text-sm font-semibold">
            {rollout.score.toFixed(2)}
          </Typography.ParagraphHafferSmall>
        </div>
      )}

      {rollout.response && (
        <div className="mt-2 pt-2 border-t border-gray-100">
          <Typography.DMMonoSmall className="text-gray-500 uppercase mb-0.5 text-xs">
            Response
          </Typography.DMMonoSmall>
          <Typography.ParagraphHafferSmall className="text-xs line-clamp-2">
            {rollout.response}
          </Typography.ParagraphHafferSmall>
        </div>
      )}

      {rollout.error && (
        <div className="mt-2 pt-2 border-t border-gray-100">
          <Typography.DMMonoSmall className="text-gray-500 uppercase mb-0.5 text-xs">
            Error
          </Typography.DMMonoSmall>
          <Typography.ParagraphHafferSmall className="text-xs line-clamp-2 text-red-600">
            {rollout.error}
          </Typography.ParagraphHafferSmall>
        </div>
      )}
    </div>
  );
};

export const LatestRolloutList = () => {
  const { rollouts } = useStreamingRolloutsState(10);

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <Typography.Heading3>Latest Rollouts</Typography.Heading3>
        <div className="flex items-center pr-2">
          <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse mr-1"></div>
          <Typography.DMMonoSmall className="text-gray-500">
            Live Streaming
          </Typography.DMMonoSmall>
        </div>
      </div>

      <div className="space-y-3">
        {rollouts.length === 0 ? (
          <div className="text-center py-8">
            <Typography.ParagraphHaffer className="text-gray-500">
              Waiting for rollouts...
            </Typography.ParagraphHaffer>
          </div>
        ) : (
          rollouts.map((rollout, index) => (
            <RolloutCard
              key={rollout.id}
              rollout={rollout}
              isNew={index === 0}
              index={index}
            />
          ))
        )}
      </div>
    </div>
  );
};
